import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const SITE_NAME = "AK Wraps & Customs";
export interface PageMeta { title: string; description?: string; noIndex?: boolean; }
export function usePageMeta({ title, description, noIndex = false }: PageMeta) {
  const { pathname } = useLocation();
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const url = `https://akwraps.ca${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`;
    document.title = fullTitle;
    function meta(key: string, content: string, property = false) {
      const attr = property ? "property" : "name";
      let element = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!element) { element = document.createElement("meta"); element.setAttribute(attr, key); document.head.appendChild(element); }
      element.content = content;
    }
    meta("robots", noIndex ? "noindex, follow" : "index, follow");
    meta("og:title", fullTitle, true); meta("twitter:title", fullTitle);
    meta("og:url", url, true);
    if (description) { meta("description", description); meta("og:description", description, true); meta("twitter:description", description); }
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = url;
  }, [title, description, noIndex, pathname]);
}
