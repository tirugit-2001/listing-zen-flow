
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SellerCentralPage from "./pages/SellerCentralPage";
import Products from "./pages/Products";
import AddProductPage from "./pages/AddProductPage";
import BrandingCanvasPage from "./pages/BrandingCanvasPage";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import OrdersPage from "./pages/OrdersPage";
import ProposalsPage from "./pages/ProposalsPage";
import ReturnGiftsPage from "./pages/ReturnGiftsPage";
import ReturnGiftDetailPage from "./pages/ReturnGiftDetailPage";
import ReturnGiftBatchPage from "./pages/ReturnGiftBatchPage";
import MarketingPage from "./pages/MarketingPage";
import CampaignDetailPage from "./pages/CampaignDetailPage";
import AudienceSegmentsPage from "./pages/AudienceSegmentsPage";
import OffersAndPromotionsPage from "./pages/OffersAndPromotionsPage";
import TaxManagementPage from "./pages/TaxManagementPage";
import VendorOnboardingPage from "./pages/VendorOnboardingPage";
import DistributorAuthorizationPage from "./pages/DistributorAuthorizationPage";
import OrderFinancingPage from "./pages/OrderFinancingPage";
import SampleOrdersPage from "./pages/SampleOrdersPage";
import NotFound from "./pages/NotFound";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/seller-central" element={<SellerCentralPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/branding-canvas" element={<BrandingCanvasPage />} />
        <Route path="/account-settings" element={<AccountSettingsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/proposals" element={<ProposalsPage />} />
        <Route path="/return-gifts" element={<ReturnGiftsPage />} />
        <Route path="/return-gifts/:id" element={<ReturnGiftDetailPage />} />
        <Route path="/return-gifts/batch/:id" element={<ReturnGiftBatchPage />} />
        <Route path="/marketing" element={<MarketingPage />} />
        <Route path="/marketing/campaign/:id" element={<CampaignDetailPage />} />
        <Route path="/marketing/audience" element={<AudienceSegmentsPage />} />
        <Route path="/offers-and-promotions" element={<OffersAndPromotionsPage />} />
        <Route path="/tax-management" element={<TaxManagementPage />} />
        <Route path="/vendor-onboarding" element={<VendorOnboardingPage />} />
        <Route path="/distributor-authorization" element={<DistributorAuthorizationPage />} />
        <Route path="/order-financing" element={<OrderFinancingPage />} />
        <Route path="/sample-orders" element={<SampleOrdersPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
