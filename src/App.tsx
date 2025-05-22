
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
            <Route path="/subscriptions" element={
              <ProtectedRoute>
                <SubscriptionPage />
              </ProtectedRoute>
            } />
            <Route path="/subscriptions/payment-methods" element={
              <ProtectedRoute>
                <SubscriptionPage />
              </ProtectedRoute>
            } />
            <Route path="/subscriptions/billing-history" element={
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
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            } />
            <Route path="/proposals" element={
              <ProtectedRoute>
                <ProposalsPage />
              </ProtectedRoute>
            } />
            <Route path="/return-gifts" element={
              <ProtectedRoute>
                <ReturnGiftsPage />
              </ProtectedRoute>
            } />
            <Route path="/return-gifts/:id" element={
              <ProtectedRoute>
                <ReturnGiftDetailPage />
              </ProtectedRoute>
            } />
            <Route path="/return-gifts/batch/:id" element={
              <ProtectedRoute>
                <ReturnGiftBatchPage />
              </ProtectedRoute>
            } />
            <Route path="/marketing" element={
              <ProtectedRoute>
                <MarketingPage />
              </ProtectedRoute>
            } />
            <Route path="/marketing/campaign/:id" element={
              <ProtectedRoute>
                <CampaignDetailPage />
              </ProtectedRoute>
            } />
            <Route path="/marketing/audience" element={
              <ProtectedRoute>
                <AudienceSegmentsPage />
              </ProtectedRoute>
            } />
            <Route path="/offers-and-promotions" element={
              <ProtectedRoute>
                <OffersAndPromotionsPage />
              </ProtectedRoute>
            } />
            <Route path="/tax-management" element={
              <ProtectedRoute>
                <TaxManagementPage />
              </ProtectedRoute>
            } />
            <Route path="/distributor-authorization" element={
              <ProtectedRoute>
                <DistributorAuthorizationPage />
              </ProtectedRoute>
            } />
            <Route path="/order-financing" element={
              <ProtectedRoute>
                <OrderFinancingPage />
              </ProtectedRoute>
            } />
            <Route path="/sample-orders" element={
              <ProtectedRoute>
                <SampleOrdersPage />
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
