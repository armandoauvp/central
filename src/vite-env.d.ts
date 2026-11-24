/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** ID do projeto no Microsoft Clarity. Ausente = métricas desligadas. */
  readonly VITE_CLARITY_PROJECT_ID?: string;
  /** "design-system" no build que publica só o Design System; "central" no resto. */
  readonly VITE_APP: "central" | "design-system";
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.css";

declare module "*.jpg" {
  const src: string;
  export default src;
}
declare module "*.jpeg" {
  const src: string;
  export default src;
}
declare module "*.png" {
  const src: string;
  export default src;
}
declare module "*.webp" {
  const src: string;
  export default src;
}
declare module "*.svg" {
  const src: string;
  export default src;
}
