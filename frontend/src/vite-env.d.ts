/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Empty in dev uses relative `/api` → Vite proxy to backend. */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
