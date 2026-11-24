import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AppProviders } from "@/components/AppProviders";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ClarityTracker } from "@/components/ClarityTracker";
import DesignSystem from "./pages/DesignSystem";

/**
 * Build só do Design System (VITE_APP=design-system), publicado à parte para
 * ser compartilhado sem expor o resto da Central. Registra uma rota só: as
 * páginas da Central, a Command Palette e o 404 da Central não são importados
 * aqui, então nem entram no bundle.
 */

/** `/`, rotas da Central e endereços desconhecidos caem no Design System. */
function ParaODesignSystem() {
  // Mantém a âncora: /#icones-app vira /design-system#icones-app.
  const { hash } = useLocation();
  return <Navigate to={{ pathname: "/design-system", hash }} replace />;
}

const AppDesignSystem = () => (
  <AppProviders>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <ClarityTracker />
      <Routes>
        <Route path="/design-system" element={<DesignSystem />} />
        <Route path="*" element={<ParaODesignSystem />} />
      </Routes>
    </BrowserRouter>
  </AppProviders>
);

export default AppDesignSystem;
