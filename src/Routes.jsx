import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import VendorDashboard from "pages/vendor-dashboard";
import DealDiscoveryShopping from "pages/deal-discovery-shopping";
import AuthenticationLoginRegister from "pages/authentication-login-register";
import ShoppingCartCheckout from "pages/shopping-cart-checkout";
import OrderTrackingHistory from "pages/order-tracking-history";
import SupplierDashboard from "pages/supplier-dashboard";
import VendorExchange from "pages/vendor-exchange";
import Virasaat from "pages/virasaat";
import KarigarConnect from "pages/karigar-connect";
import NotFound from "pages/NotFound";
import Profile from "pages/profile";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<AuthenticationLoginRegister />} />
        <Route path="/login" element={<AuthenticationLoginRegister />} />
        <Route path="/deals" element={<DealDiscoveryShopping />} />
        <Route path="/cart" element={<ShoppingCartCheckout />} />
        <Route path="/orders" element={<OrderTrackingHistory />} />
        <Route path="/dashboard" element={<VendorDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/vendor-exchange" element={<VendorExchange />} />
        <Route path="/virasaat" element={<Virasaat />} />
        <Route path="/karigar-connect" element={<KarigarConnect />} />
        {/* Legacy routes for backward compatibility */}
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        <Route path="/deal-discovery-shopping" element={<DealDiscoveryShopping />} />
        <Route path="/authentication-login-register" element={<AuthenticationLoginRegister />} />
        <Route path="/shopping-cart-checkout" element={<ShoppingCartCheckout />} />
        <Route path="/order-tracking-history" element={<OrderTrackingHistory />} />
        <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;