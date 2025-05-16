
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PricingPage from "./pages/PricingPage";
import NotFound from "./pages/NotFound";
import EcoPass from "./pages/EcoPass";
import BottomNav from "./components/BottomNav";
import MyForest from "./pages/MyForest";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/eco-pass" element={<EcoPass />} />
        <Route path="/my-forest" element={<MyForest />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BottomNav />
      <Toaster />
      <Sonner />
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
