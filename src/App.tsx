import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import SubscriptionPage from "./pages/SubscriptionPage";
import SignInPage from "./pages/SignInPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import NotFound from "./pages/NotFound";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./contexts/AuthContext";
import { PaymentProvider } from "./contexts/PaymentContext";
import ProtectedRoute from "./components/auth/ProtectedRoute"; 
import OnboardingRequiredRoute from "./components/auth/OnboardingRequiredRoute";
import HamperManagementPage from "./pages/HamperManagementPage";
import CreateHamperPage from "./pages/CreateHamperPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <PaymentProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<SignInPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            
            {/* Authenticated routes that don't require completed onboarding */}
            <Route path="/vendor-onboarding" element={
              <ProtectedRoute>
                <VendorOnboardingPage />
              </ProtectedRoute>
            } />
            <Route path="/seller-central" element={
              <ProtectedRoute>
                <SellerCentralPage />
              </ProtectedRoute>
            } />
            <Route path="/subscriptions/*" element={
              <ProtectedRoute>
                <SubscriptionPage />
              </ProtectedRoute>
            } />
            <Route path="/account-settings" element={
              <ProtectedRoute>
                <AccountSettingsPage />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            } />
            
            {/* Protected routes that require completed onboarding */}
            <Route path="/products" element={
              <OnboardingRequiredRoute>
                <Products />
              </OnboardingRequiredRoute>
            } />
            <Route path="/add-product" element={
              <OnboardingRequiredRoute>
                <AddProductPage />
              </OnboardingRequiredRoute>
            } />
            <Route path="/branding-canvas" element={
              <OnboardingRequiredRoute>
                <BrandingCanvasPage />
              </OnboardingRequiredRoute>
            } />
            <Route path="/analytics" element={
              <OnboardingRequiredRoute>
                <AnalyticsPage />
              </OnboardingRequiredRoute>
            } />
            <Route path="/proposals" element={
              <OnboardingRequiredRoute>
                <ProposalsPage />
              </OnboardingRequiredRoute>
            } />
            <Route path="/return-gifts/*" element={
              <OnboardingRequiredRoute>
                <Routes>
                  <Route path="/" element={<ReturnGiftsPage />} />
                  <Route path="/:id" element={<ReturnGiftDetailPage />} />
                  <Route path="/batch/:id" element={<ReturnGiftBatchPage />} />
                </Routes>
              </OnboardingRequiredRoute>
            } />
            <Route path="/marketing/*" element={
              <OnboardingRequiredRoute>
                <Routes>
                  <Route path="/" element={<MarketingPage />} />
                  <Route path="/campaign/:id" element={<CampaignDetailPage />} />
                  <Route path="/audience" element={<AudienceSegmentsPage />} />
                </Routes>
              </OnboardingRequiredRoute>
            } />
            <Route path="/offers-and-promotions" element={
              <OnboardingRequiredRoute>
                <OffersAndPromotionsPage />
              </OnboardingRequiredRoute>
            } />
            <Route path="/tax-management" element={
              <OnboardingRequiredRoute>
                <TaxManagementPage />
              </OnboardingRequiredRoute>
            } />
            <Route path="/distributor-authorization" element={
              <OnboardingRequiredRoute>
                <DistributorAuthorizationPage />
              </OnboardingRequiredRoute>
            } />
            <Route path="/order-financing" element={
              <OnboardingRequiredRoute>
                <OrderFinancingPage />
              </OnboardingRequiredRoute>
            } />
            <Route path="/sample-orders" element={
              <OnboardingRequiredRoute>
                <SampleOrdersPage />
              </OnboardingRequiredRoute>
            } />
            <Route path="/hamper-management" element={
              <ProtectedRoute>
                <HamperManagementPage />
              </ProtectedRoute>
            } />
            <Route path="/create-hamper" element={
              <ProtectedRoute>
                <CreateHamperPage />
              </ProtectedRoute>
            } />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </PaymentProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
