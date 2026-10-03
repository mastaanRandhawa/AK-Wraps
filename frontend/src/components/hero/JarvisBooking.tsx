import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { serviceOptions } from "@/content/services";
import { site } from "@/config/site";

const questions = [
  "What can I help you with? Select one or more of our services below.",
  "What is your vehicle’s year, make and model?",
  "What is your name?",
  "What email address can our team reach you at?",
  "And what is your phone number?",
];
const labels = ["Services", "Vehicle year, make and model", "Name", "Email", "Phone"];
const deliveryKey = import.meta.env.VITE_WEB3FORMS_KEY;

export function JarvisBooking() {
  const [visible, setVisible] = useState(false);
  const [scrollPrompt, setScrollPrompt] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const sending = useRef(false);
  useEffect(() => { const timer = window.setTimeout(() => setVisible(true), 1500); return () => clearTimeout(timer); }, []);
  useEffect(() => { input.current?.focus(); }, [step]);
  useEffect(() => {
    let timer: number | undefined;
    const reset = () => {
      window.clearTimeout(timer);
      setScrollPrompt(false);
      if (dialog.current?.open || status === "sent") return;
      timer = window.setTimeout(() => {
        if (!dialog.current?.open && !document.hidden) setScrollPrompt(true);
      }, 3000);
    };
    const hide = () => { window.clearTimeout(timer); setScrollPrompt(false); };
    window.addEventListener("scroll", reset, { passive: true });
    document.addEventListener("visibilitychange", hide);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", reset);
      document.removeEventListener("visibilitychange", hide);
    };
  }, [status]);
  const openBooking = () => { setScrollPrompt(false); dialog.current?.showModal(); };
  const close = () => { dialog.current?.close(); };
  function next(e: FormEvent) {
    e.preventDefault();
    const answer = step === 0 ? services.join(", ") : value.trim();
    if (!answer) return;
    setAnswers(previous => [...previous.slice(0, step), answer]);
    setValue(""); setStep(step + 1); setStatus("idle");
  }
  async function send() {
    if (!deliveryKey || sending.current) return;
    sending.current = true; setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: deliveryKey, subject: "Jarvis — New appointment enquiry", from_name: "AK Wraps website · Jarvis", name: answers[2], email: answers[3], phone: answers[4], vehicle: answers[1], services: answers[0], botcheck: false }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error("Delivery failed");
      setStatus("sent");
    } catch { setStatus("error"); }
    finally { sending.current = false; }
  }
  const emailHref = `mailto:${site.email}?subject=${encodeURIComponent("Jarvis — Appointment enquiry")}&body=${encodeURIComponent(answers.map((answer, i) => `${labels[i]}: ${answer}`).join("\n\n"))}`;
  return <>
    {<div className={`relative z-20 mb-10 flex h-12 -translate-y-6 items-center justify-center transition-opacity duration-300 sm:h-[3.25rem] ${visible && !scrollPrompt ? "opacity-100" : "invisible opacity-0"}`}><Button size="lg" onClick={openBooking} style={{ zoom: 1.15 }} className="jarvis-book-pulse shadow-[0_0_35px_#01c8f944]">Book Now</Button></div>}
    {scrollPrompt && createPortal(
      <div className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center">
        <div className="pointer-events-auto relative">
          <Button size="lg" onClick={openBooking} style={{ zoom: 1.15 }} className="jarvis-book-pulse shadow-[0_0_35px_#01c8f944]">Book Now</Button>
          <button type="button" aria-label="Dismiss booking reminder" onClick={() => setScrollPrompt(false)} className="absolute -right-8 -top-8 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/80 text-xl text-white">×</button>
        </div>
      </div>, document.body)}
    {createPortal(<dialog ref={dialog} aria-labelledby="jarvis-title" className="fixed inset-0 m-auto max-h-[90svh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border border-white/15 bg-[#101315] p-6 text-white shadow-2xl backdrop:bg-black/75 sm:p-8" onClick={e => { if (e.target === dialog.current) { const r = dialog.current.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) close(); } }}>
      <div className="mb-6 flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.25em] text-accent">AK Wraps & Customs</p><h2 id="jarvis-title" className="mt-2 text-2xl">Jarvis</h2><p className="mt-1 text-sm text-white/50">Your virtual booking assistant</p></div><button aria-label="Close booking conversation" onClick={close} className="h-11 w-11 rounded-full border border-white/20 text-xl">×</button></div>
      {status === "sent" ? <div role="status"><p className="text-xl text-accent">Your enquiry has been sent.</p><p className="mt-4 text-white/70">Our team will contact you to discuss your project and confirm an appointment.</p><Button className="mt-6" onClick={close}>Done</Button></div> : step < questions.length ? <form onSubmit={next}>
        <p className="mb-3 text-xs text-white/40">Step {step + 1} of {questions.length}</p>
        <p aria-live="polite" className="mb-5 text-lg leading-relaxed">{step === 0 && "Hello, I’m Jarvis. "}{questions[step]}</p>
        {step === 0 ? <fieldset className="space-y-2"><legend className="sr-only">Choose services</legend>{[...serviceOptions, "Other"].map(service => <label key={service} className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/15 p-3 text-sm"><input type="checkbox" className="accent-cyan-400" checked={services.includes(service)} onChange={e => setServices(previous => e.target.checked ? [...previous, service] : previous.filter(item => item !== service))}/>{service}</label>)}</fieldset> : <><label className="sr-only" htmlFor="jarvis-answer">{labels[step]}</label><input ref={input} id="jarvis-answer" value={value} onChange={e => setValue(e.target.value)} required maxLength={200} minLength={step === 4 ? 7 : 2} pattern={step === 4 ? "[+0-9() .-]{7,30}" : undefined} type={step === 3 ? "email" : step === 4 ? "tel" : "text"} autoComplete={step === 2 ? "name" : step === 3 ? "email" : step === 4 ? "tel" : "off"} className="w-full rounded-lg border border-white/20 bg-black/30 p-4 text-white focus:outline-accent" /></>}
        <div className="mt-6 flex gap-3">{step > 0 && <Button type="button" variant="secondary" onClick={() => { setValue(answers[step - 1] ?? ""); setStep(step - 1); }}>Back</Button>}<Button type="submit" disabled={step === 0 ? !services.length : !value.trim()}>Continue</Button></div>
      </form> : <div><h3 className="mb-4 text-lg">Please review your enquiry.</h3><dl className="space-y-3">{answers.map((answer, i) => <div key={labels[i]}><dt className="text-xs uppercase tracking-wide text-white/40">{labels[i]}</dt><dd className="mt-1 break-words text-sm">{answer}</dd></div>)}</dl><p className="mt-5 text-xs leading-relaxed text-white/50">By sending, you agree to share these details with AK Wraps & Customs so we can contact you about this enquiry. An appointment is confirmed only after our team contacts you.</p>
        {status === "error" && <p role="alert" className="mt-4 text-accent">Your enquiry could not be sent. Please retry or <a className="underline" href={emailHref}>email your details</a>.</p>}
        {!deliveryKey && <p className="mt-4 text-sm text-white/70">Continue in your email app to send your enquiry to our team.</p>}
        <div className="mt-6 flex flex-wrap gap-3"><Button variant="secondary" disabled={status === "sending"} onClick={() => { setStep(0); setValue(""); }}>Edit details</Button>{deliveryKey ? <Button onClick={send} disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send enquiry"}</Button> : <Button asChild><a href={emailHref}>Email my enquiry</a></Button>}</div>
      </div>}
    </dialog>, document.body)}
  </>;
}







