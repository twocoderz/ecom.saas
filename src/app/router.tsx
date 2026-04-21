import { createBrowserRouter, Outlet } from "react-router-dom";
import {
  AccessibilityPage,
  AccountDashboardPage,
  AddressesPage,
  AuthPage,
  BrandPage,
  CartPage,
  CategoryPage,
  CheckoutConfirmationPage,
  CheckoutInformationPage,
  CheckoutPaymentPage,
  CheckoutShippingPage,
  CollectionPage,
  ContactPage,
  ErrorPage,
  ForgotPasswordPage,
  HelpPage,
  HomePage,
  LegalNoticePage,
  MaintenancePage,
  NotFoundPage,
  OrderDetailPage,
  OrderTrackingPage,
  OrdersPage,
  PaymentMethodsPage,
  PrivacyPolicyPage,
  ProductDetailPage,
  SearchResultsPage,
  ShippingReturnsPage,
  SiteMapPage,
  TermsPage,
  WishlistPage,
} from "../pages";
import { AppShell } from "../shared/components/layout/AppShell";
import { routeBlueprint } from "./routeBlueprint";

/**
 * Resolve a path from the route blueprint by route ID.
 * This keeps route definitions in sync with the architecture map.
 */
function pathById(id: string): string {
  const item = routeBlueprint.find((route) => route.id === id);

  if (!item) {
    throw new Error(`Route ID not found in blueprint: ${id}`);
  }

  return item.path;
}

/**
 * Shared storefront layout.
 * JD mapping: wraps most pages in the same header/trust/footer shell.
 */
function StorefrontLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

/**
 * Application router.
 * Includes all scaffolded pages to keep architecture and implementation aligned.
 */
export const appRouter = createBrowserRouter([
  {
    path: pathById("home"),
    element: <StorefrontLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: pathById("category").slice(1), element: <CategoryPage /> },
      {
        path: pathById("category-legacy").slice(1),
        element: <CategoryPage />,
      },
      { path: pathById("search").slice(1), element: <SearchResultsPage /> },
      { path: pathById("brand").slice(1), element: <BrandPage /> },
      { path: pathById("collection").slice(1), element: <CollectionPage /> },
      { path: pathById("product").slice(1), element: <ProductDetailPage /> },
      {
        path: pathById("product-legacy").slice(1),
        element: <ProductDetailPage />,
      },
      { path: pathById("cart").slice(1), element: <CartPage /> },
      {
        path: pathById("checkout-info").slice(1),
        element: <CheckoutInformationPage />,
      },
      {
        path: pathById("checkout-shipping").slice(1),
        element: <CheckoutShippingPage />,
      },
      {
        path: pathById("checkout-payment").slice(1),
        element: <CheckoutPaymentPage />,
      },
      {
        path: pathById("checkout-confirmation").slice(1),
        element: <CheckoutConfirmationPage />,
      },
      { path: pathById("auth").slice(1), element: <AuthPage /> },
      {
        path: pathById("forgot-password").slice(1),
        element: <ForgotPasswordPage />,
      },
      {
        path: pathById("account-dashboard").slice(1),
        element: <AccountDashboardPage />,
      },
      { path: pathById("account-orders").slice(1), element: <OrdersPage /> },
      {
        path: pathById("account-order-detail").slice(1),
        element: <OrderDetailPage />,
      },
      {
        path: pathById("account-addresses").slice(1),
        element: <AddressesPage />,
      },
      {
        path: pathById("account-payment-methods").slice(1),
        element: <PaymentMethodsPage />,
      },
      {
        path: pathById("account-wishlist").slice(1),
        element: <WishlistPage />,
      },
      { path: pathById("help").slice(1), element: <HelpPage /> },
      {
        path: pathById("order-tracking").slice(1),
        element: <OrderTrackingPage />,
      },
      {
        path: pathById("shipping-returns").slice(1),
        element: <ShippingReturnsPage />,
      },
      { path: pathById("contact").slice(1), element: <ContactPage /> },
      { path: pathById("legal-notice").slice(1), element: <LegalNoticePage /> },
      {
        path: pathById("privacy-policy").slice(1),
        element: <PrivacyPolicyPage />,
      },
      { path: pathById("terms").slice(1), element: <TermsPage /> },
      {
        path: pathById("accessibility").slice(1),
        element: <AccessibilityPage />,
      },
      { path: pathById("site-map").slice(1), element: <SiteMapPage /> },
      { path: pathById("maintenance").slice(1), element: <MaintenancePage /> },
      { path: pathById("error").slice(1), element: <ErrorPage /> },
      { path: pathById("not-found").slice(1), element: <NotFoundPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
