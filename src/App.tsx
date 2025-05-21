
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

// Pages
import Index from "@/pages/Index";
import Products from "@/pages/Products";
import AddProductPage from "@/pages/AddProductPage";
import BrandingCanvasPage from "@/pages/BrandingCanvasPage";
import NotFound from "@/pages/NotFound";
import OrdersPage from "@/pages/OrdersPage";
import ProposalsPage from "@/pages/ProposalsPage";
import ReturnGiftsPage from "@/pages/ReturnGiftsPage";
import ReturnGiftDetailPage from "@/pages/ReturnGiftDetailPage";
import ReturnGiftBatchPage from "@/pages/ReturnGiftBatchPage";
import SellerCentralPage from "@/pages/SellerCentralPage";
import AccountSettingsPage from "@/pages/AccountSettingsPage";
import MarketingPage from "@/pages/MarketingPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import AudienceSegmentsPage from "@/pages/AudienceSegmentsPage";
import CampaignDetailPage from "@/pages/CampaignDetailPage";
import TaxManagementPage from "@/pages/TaxManagementPage";
import OffersAndPromotionsPage from "@/pages/OffersAndPromotionsPage";
import VendorOnboardingPage from "@/pages/VendorOnboardingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<SellerCentralPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/proposals" element={<ProposalsPage />} />
        <Route path="/account-settings" element={<AccountSettingsPage />} />
        <Route path="/branding-canvas" element={<BrandingCanvasPage />} />
        <Route path="/return-gifts" element={<ReturnGiftsPage />} />
        <Route path="/return-gift/:id" element={<ReturnGiftDetailPage />} />
        <Route path="/return-gift-batch/:id" element={<ReturnGiftBatchPage />} />
        <Route path="/marketing" element={<MarketingPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/audience-segments" element={<AudienceSegmentsPage />} />
        <Route path="/campaign/:id" element={<CampaignDetailPage />} />
        <Route path="/tax-management" element={<TaxManagementPage />} />
        <Route path="/offers-and-promotions" element={<OffersAndPromotionsPage />} />
        <Route path="/vendor-onboarding" element={<VendorOnboardingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
