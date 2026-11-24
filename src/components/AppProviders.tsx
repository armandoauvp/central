import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrandProvider } from "@/contexts/BrandContext";
import { ViewProvider } from "@/contexts/ViewContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { CarecaProvider } from "@/contexts/CarecaContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * Providers e tratamento de erro comuns aos dois apps: a Central inteira
 * (src/App.tsx) e o build só do Design System (src/AppDesignSystem.tsx).
 * Cada app monta o próprio roteador dentro daqui.
 */

const queryClient = new QueryClient();

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; message: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: "" };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error?.message ?? String(error) };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("App crashed:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, fontFamily: "monospace", color: "#b00" }}>
          <h2>Algo deu errado ao renderizar o app.</h2>
          <pre style={{ whiteSpace: "pre-wrap", marginTop: 12 }}>{this.state.message}</pre>
          <button style={{ marginTop: 16 }} onClick={() => this.setState({ hasError: false, message: "" })}>
            Tentar novamente
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <BrandProvider>
            <ViewProvider>
              <CarecaProvider>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  {children}
                </TooltipProvider>
              </CarecaProvider>
            </ViewProvider>
          </BrandProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
