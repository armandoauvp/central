import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import path from "path";

/**
 * Build só do Design System (VITE_APP=design-system ou --mode design-system):
 * troca a entrada do index.html por src/main-design-system.tsx — que só
 * importa a página do DS —, reescreve título e descrição, tira o widget do
 * Userback (feedback da Central) e apaga o 404.html do GitHub Pages.
 *
 * Toda substituição é conferida: se o index.html mudar e um padrão sumir, o
 * build falha em vez de publicar a Central inteira no lugar do DS.
 */
function soDesignSystem(): Plugin {
  let isBuild = false;
  let outDir = "";

  const trocar = (html: string, de: string | RegExp, para: string, oQue: string) => {
    const novo = html.replace(de, para);
    if (novo === html) {
      throw new Error(`[design-system] index.html: não encontrei ${oQue}. Atualize o plugin no vite.config.ts.`);
    }
    return novo;
  };

  return {
    name: "auvp-so-design-system",
    configResolved(config) {
      isBuild = config.command === "build";
      outDir = path.resolve(config.root, config.build.outDir);
    },
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        let out = trocar(html, 'src="/src/main.tsx"', 'src="/src/main-design-system.tsx"', "a entrada /src/main.tsx");
        out = trocar(out, /Central — AUVP/g, "Design System — AUVP", "o título");
        out = trocar(
          out,
          /Central de Produto — Intranet AUVP Capital\.[^"]*/g,
          "Design System AUVP — tokens visuais, componentes e padrões de interface da AUVP Capital e da AUVP Escola.",
          "a descrição"
        );
        out = trocar(out, /\s*<script>\s*\/\/ Userback[\s\S]*?<\/script>/, "", "o script do Userback");
        return out;
      },
    },
    closeBundle() {
      // O 404.html é o truque de SPA do GitHub Pages (e tem o título da Central).
      if (isBuild) fs.rmSync(path.join(outDir, "404.html"), { force: true });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const designSystem = mode === "design-system" || env.VITE_APP === "design-system";

  return {
    // Base para GitHub Pages.
    // - Se publicado em https://<user>.github.io/<repo>/ -> use "/<repo>/"
    // - Se publicado em dominio customizado (raiz) -> use "/"
    // Pode ser sobrescrito via env: VITE_BASE=/central/ npm run build
    // Na Vercel (process.env.VERCEL definido automaticamente pela plataforma) o site
    // é publicado na raiz do domínio, então o base cai para "/" sem configuração manual.
    // O build só do Design System também roda na raiz.
    base: process.env.VITE_BASE ?? (process.env.VERCEL || designSystem ? "/" : "/central/"),
    define: {
      // Fixa o app em tempo de build (lido por src/lib/appMode.ts).
      "import.meta.env.VITE_APP": JSON.stringify(designSystem ? "design-system" : "central"),
    },
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [react(), designSystem && soDesignSystem()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    test: {
      environment: "jsdom",
      globals: true, // necessário para o auto-cleanup do Testing Library
      setupFiles: ["src/test/setup.ts"],
      // archive/ guarda a iteração anterior do projeto (inativa, fora do build)
      // — seus testes não devem rodar na suíte principal.
      exclude: ["node_modules/**", "archive/**"],
    },
  };
});
