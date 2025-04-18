
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { MainLayout } from "./components/layout/Sidebar";
import { AIChatbot } from "./components/period/AIChatbot";
import CalendarPage from "./pages/Calendar";
import CycleHistory from "./pages/CycleHistory";
import Symptoms from "./pages/Symptoms";
import Mood from "./pages/Mood";
import Health from "./pages/Health";
import Insights from "./pages/Insights";
import Resources from "./pages/Resources";
import Settings from "./pages/Settings";
import { ThemeProvider } from "./providers/ThemeProvider";
import { initDatabase } from "./services/databaseService";

const queryClient = new QueryClient();

const App = () => {
  // Initialize the database when the app starts
  useEffect(() => {
    initDatabase().then(success => {
      if (success) {
        console.log("Database initialized successfully");
      } else {
        console.error("Failed to initialize database");
      }
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/chat" element={
                <MainLayout>
                  <div className="max-w-4xl mx-auto py-6">
                    <h1 className="text-3xl font-display font-bold text-periodpal-primary mb-6">
                      Ask HerChronos
                    </h1>
                    <AIChatbot />
                  </div>
                </MainLayout>
              } />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/history" element={<CycleHistory />} />
              <Route path="/symptoms" element={<Symptoms />} />
              <Route path="/mood" element={<Mood />} />
              <Route path="/health" element={<Health />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/settings" element={<Settings />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
