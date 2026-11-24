/**
 * Qual app este build publica.
 *
 * - "central": a Central inteira (GitHub Pages e o projeto da Vercel da Central);
 * - "design-system": só o Design System, para compartilhar fora da Central.
 *
 * Vem de `VITE_APP=design-system` (ou `--mode design-system`) e é fixado em
 * tempo de build pelo `vite.config.ts`. Como vira uma constante literal, o
 * Rollup descarta o ramo que não vale — o código da Central nem entra no
 * bundle do Design System.
 */
export const SO_DESIGN_SYSTEM = import.meta.env.VITE_APP === "design-system";
