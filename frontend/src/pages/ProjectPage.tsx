import { Link, useParams } from "react-router-dom";
import stories from "@/content/project-stories.json";
import guides from "@/content/search-pages.json";
import { portfolioBuilds } from "@/content/portfolio";
import { usePageMeta } from "@/hooks/use-page-meta";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { Button } from "@/components/ui/button";

export function ProjectPage() {
  const { projectSlug } = useParams();
  const story = stories.find(item => item.slug === projectSlug);
  const build = portfolioBuilds.find(item => item.id === story?.id);
  return story && build ? <ProjectContent story={story} build={build} /> : <NotFoundPage />;
}

function ProjectContent({ story, build }: { story: typeof stories[number]; build: typeof portfolioBuilds[number] }) {
  usePageMeta({ title: story.heading, description: story.summary });
  const enquiry = `/contact?project=${encodeURIComponent(story.heading)}#booking-form`;
  return <article className="container-padding mx-auto max-w-6xl pb-20 text-white" style={{ paddingTop: "calc(var(--navbar-offset) + 3rem)" }}>
    <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-3 text-sm text-white/60"><Link to="/">Home</Link><span>/</span><Link to="/gallery">Our work</Link><span>/</span><span aria-current="page">{build.title}</span></nav>
    <p className="type-label text-accent">AK Builds · Delta studio</p>
    <h1 className="type-section mt-4 max-w-4xl">{story.heading}</h1>
    <p className="mt-6 max-w-3xl leading-relaxed text-white/70">{story.summary}</p>
    <img src={build.image} alt={`${build.brand} ${build.title} — completed AK Wraps project`} width={1200} height={900} className="mt-10 max-h-[70vh] w-full rounded-lg bg-white/5 object-contain" fetchPriority="high" />
    <div className="mt-12 grid gap-10 md:grid-cols-2"><section><h2 className="text-2xl font-semibold">The build</h2><p className="mt-4 leading-relaxed text-white/65">{story.detail}</p><p className="mt-4 text-sm text-white/50">Project details are based on our original published service record. Coverage, materials and pricing for your vehicle are confirmed separately.</p>{build.sourceUrl && <a className="mt-5 inline-flex min-h-11 items-center text-accent underline" href={build.sourceUrl} target="_blank" rel="noopener noreferrer">View the original project post ↗</a>}</section>
    <section><h2 className="text-2xl font-semibold">Recorded services</h2><ul className="mt-4 space-y-3 text-white/70">{build.services.map(service => <li key={service} className="border-b border-white/10 pb-3">{service}</li>)}</ul></section></div>
    <section className="mt-12 rounded-lg border border-white/15 bg-white/[0.03] p-6 sm:p-8"><h2 className="text-2xl font-semibold">Plan your own finish</h2><p className="mt-4 max-w-3xl text-white/65">Tell us your vehicle, preferred finish and any existing wrap or paint repairs. We will discuss material choices, preparation, coverage, timing and aftercare at our Delta studio.</p><nav aria-label="Related services" className="my-6 flex flex-wrap gap-5">{story.guides.map(slug => <Link className="text-accent underline" key={slug} to={`/services/${slug}`}>{guides.find(page => page.slug === slug)?.title}</Link>)}</nav><Button asChild><Link to={enquiry}>Discuss a similar project</Link></Button></section>
    <section className="mt-12"><h2 className="text-2xl font-semibold">More AK builds</h2><div className="mt-5 flex flex-wrap gap-5">{stories.filter(item => item.id !== story.id).slice(0,3).map(item => <Link key={item.id} className="inline-flex min-h-11 items-center text-accent underline" to={`/projects/${item.slug}`}>{item.heading}</Link>)}</div></section>
  </article>;
}
