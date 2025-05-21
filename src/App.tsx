
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Products from "./pages/Products";
import AddProductPage from "./pages/AddProductPage";
import BrandingCanvasPage from "./pages/BrandingCanvasPage";
import SellerCentralPage from "./pages/SellerCentralPage";
import NotFound from "./pages/NotFound";
import OrdersPage from "./pages/OrdersPage";
import ProposalsPage from "./pages/ProposalsPage";
import ReturnGiftsPage from "./pages/ReturnGiftsPage";
import ReturnGiftDetailPage from "./pages/ReturnGiftDetailPage";
import ReturnGiftBatchPage from "./pages/ReturnGiftBatchPage";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import AnalyticsPage from "./pages/AnalyticsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/seller-central" replace />} />
          <Route path="/seller-central" element={<SellerCentralPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/branding-canvas" element={<BrandingCanvasPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/proposals" element={<ProposalsPage />} />
          <Route path="/return-gifts" element={<ReturnGiftsPage />} />
          <Route path="/return-gifts/:id" element={<ReturnGiftDetailPage />} />
          <Route path="/return-gifts/batch" element={<ReturnGiftBatchPage />} />
          <Route path="/account-settings" element={<AccountSettingsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
