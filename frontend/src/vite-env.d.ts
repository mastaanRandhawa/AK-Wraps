/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HERO_VIDEO_URL?: string;
  /** Web3Forms access key for the contact form. Falls back to mailto when unset. */
  readonly VITE_WEB3FORMS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
