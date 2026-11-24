import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProviders } from "@/components/AppProviders";
import { CommandPalette } from "@/components/CommandPalette";
import { EasterEgg } from "@/components/EasterEgg";
import { CarecaScanEffect } from "@/components/CarecaScanEffect";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ClarityTracker } from "@/components/ClarityTracker";
import Hub from "./pages/Hub";
import TimePage from "./pages/TimePage";
import RoadmapPage from "./pages/RoadmapPage";
import NovidadesPage from "./pages/NovidadesPage";
import DesignSystem from "./pages/DesignSystem";
import TomEVozPage from "./pages/TomEVozPage";
import SolucoesPage from "./pages/SolucoesPage";
import ProdutosFisicosPage from "./pages/ProdutosFisicosPage";
import NotFound from "./pages/NotFound";

/** A Central inteira. O build só do Design System usa src/AppDesignSystem.tsx. */
const App = () => (
  <AppProviders>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <ClarityTracker />
      <CommandPalette />
      <EasterEgg />
      <CarecaScanEffect />
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/time" element={<TimePage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/novidades" element={<NovidadesPage />} />
        <Route path="/design-system" element={<DesignSystem />} />
        <Route path="/tom-e-voz" element={<TomEVozPage />} />
        <Route path="/solucoes" element={<SolucoesPage />} />
        <Route path="/produtos-fisicos" element={<ProdutosFisicosPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </AppProviders>
);

export default App;
