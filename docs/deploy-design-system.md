# Deploy só do Design System (Vercel)

O mesmo repositório gera dois builds:

| Build | Como | Base | O que publica |
|-------|------|------|---------------|
| Central | `npm run build` | `/central/` (GitHub Pages) ou `/` (Vercel) | A Central inteira |
| Design System | `VITE_APP=design-system` ou `npm run build:ds` | `/` | Só `/design-system` |

## Como o build do DS se isola

- `vite.config.ts` liga o modo DS com `VITE_APP=design-system` (variável de ambiente) ou `--mode design-system`. Nesse modo, o plugin `auvp-so-design-system` troca a entrada do `index.html` para `src/main-design-system.tsx`, troca título e descrição, remove o Userback e apaga o `404.html` do GitHub Pages. Se algum desses trechos sumir do `index.html`, o build **falha** em vez de publicar a Central.
- `src/AppDesignSystem.tsx` registra só `/design-system`. `/`, as rotas da Central e qualquer endereço desconhecido redirecionam para `/design-system`, mantendo a âncora (`/#icones-app` → `/design-system#icones-app`). Como as páginas da Central, a Command Palette e o 404 não são importados, eles nem entram no bundle.
- `src/lib/appMode.ts` expõe `SO_DESIGN_SYSTEM`. Com ele, a `GlobalNav` vira só a marca "Design System AUVP", o `SearchButton` some (fica a busca da sidebar do DS) e o Clarity não usa o ID da Central.
- Clarity: fica desligado no DS. Só liga se `VITE_CLARITY_PROJECT_ID` for definido no projeto da Vercel do DS, de preferência com um projeto do Clarity próprio.

## Rodar localmente

```bash
npm run dev:ds       # dev server em localhost:8080, já no modo DS
npm run build:ds     # build em dist/
npm run preview:ds   # serve o dist/ do DS
```

## Criar o projeto na Vercel

1. Na Vercel: **Add New… → Project** e importe o repositório `ProdutosAUVP/central`. É um projeto novo, separado do que já publica a Central (se esse existir).
2. Framework Preset: **Vite** (ou "Other"). Build Command, Output Directory e o rewrite de SPA vêm do `vercel.json` versionado (`npm run build`, `dist`, tudo → `/index.html`).
3. Em **Environment Variables**, antes do primeiro deploy, crie `VITE_APP` = `design-system` em **Production** e **Preview**. É ela que separa este projeto do da Central. Sem ela, o projeto publica a Central inteira.
4. Opcional: `VITE_CLARITY_PROJECT_ID` com o ID de um projeto do Clarity só do DS.
5. Faça o deploy e confira:
   - o título da aba é "Design System — AUVP";
   - `/` abre em `/design-system`;
   - `/time` cai no DS;
   - o header não tem menu de sistemas nem busca.
6. Para restringir o acesso, use **Settings → Deployment Protection** do projeto.

O GitHub Pages não muda: o workflow `deploy.yml` roda `npm run build` com `VITE_BASE=/central/` e sem `VITE_APP`.
