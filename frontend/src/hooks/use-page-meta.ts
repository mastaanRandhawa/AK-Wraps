import { useEffect } from "react";

const SITE_NAME = "AK Wraps & Customs";

export interface PageMeta {
  title: string;
  description?: string;
}

export function usePageMeta({ title, description }: PageMeta) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDescription = meta?.getAttribute("content") ?? null;

    if (description) {
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);
    }

    return () => {
      document.title = prevTitle;
      if (description && meta) {
        if (prevDescription) meta.setAttribute("content", prevDescription);
        else meta.remove();
      }
    };
  }, [title, description]);
}
