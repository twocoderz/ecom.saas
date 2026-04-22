import { ROUTE_PATHS } from "../config/paths";

/**
 * Route blueprint for the whole storefront.
 * JD mapping: mirrors top journeys and support/legal/account coverage
 * while staying generic for multi-category commerce.
 */
export type RouteBlueprintItem = {
  id: string;
  path: string;
  page: string;
  jdReference: string;
};

export const routeBlueprint: RouteBlueprintItem[] = [
  {
    id: "home",
    path: ROUTE_PATHS.home,
    page: "HomePage",
    jdReference: "Homepage campaign and discovery rails",
  },

  // Catalog journey
  {
    id: "category",
    path: ROUTE_PATHS.category,
    page: "CategoryPage",
    jdReference: "Category listing style (PLP)",
  },
  {
    id: "category-legacy",
    path: ROUTE_PATHS.categoryLegacy,
    page: "CategoryPage",
    jdReference: "Legacy listing alias kept during migration",
  },
  {
    id: "search",
    path: ROUTE_PATHS.search,
    page: "SearchResultsPage",
    jdReference: "Global search results",
  },
  {
    id: "brand",
    path: ROUTE_PATHS.brand,
    page: "BrandPage",
    jdReference: "Brand landing pages",
  },
  {
    id: "collection",
    path: ROUTE_PATHS.collection,
    page: "CollectionPage",
    jdReference: "Campaign and curated collections",
  },
  {
    id: "product",
    path: ROUTE_PATHS.product,
    page: "ProductDetailPage",
    jdReference: "Product detail page (PDP)",
  },
  {
    id: "product-legacy",
    path: ROUTE_PATHS.productLegacy,
    page: "ProductDetailPage",
    jdReference: "Legacy PDP alias kept during migration",
  },

  // Cart and checkout
  {
    id: "cart",
    path: ROUTE_PATHS.cart,
    page: "CartPage",
    jdReference: "Bag / cart step before checkout",
  },
  {
    id: "checkout-info",
    path: ROUTE_PATHS.checkoutInfo,
    page: "CheckoutInformationPage",
    jdReference: "Checkout step: customer info",
  },
  {
    id: "checkout-shipping",
    path: ROUTE_PATHS.checkoutShipping,
    page: "CheckoutShippingPage",
    jdReference: "Checkout step: shipping method",
  },
  {
    id: "checkout-payment",
    path: ROUTE_PATHS.checkoutPayment,
    page: "CheckoutPaymentPage",
    jdReference: "Checkout step: payment",
  },
  {
    id: "checkout-confirmation",
    path: ROUTE_PATHS.checkoutConfirmation,
    page: "CheckoutConfirmationPage",
    jdReference: "Order confirmation",
  },

  // Account journey
  {
    id: "auth",
    path: ROUTE_PATHS.auth,
    page: "AuthPage",
    jdReference: "Account sign in / sign up entry",
  },
  {
    id: "forgot-password",
    path: ROUTE_PATHS.forgotPassword,
    page: "ForgotPasswordPage",
    jdReference: "Password recovery flow",
  },
  {
    id: "account-dashboard",
    path: ROUTE_PATHS.accountDashboard,
    page: "AccountDashboardPage",
    jdReference: "Customer dashboard and shortcuts",
  },
  {
    id: "account-orders",
    path: ROUTE_PATHS.accountOrders,
    page: "OrdersPage",
    jdReference: "Order history list",
  },
  {
    id: "account-order-detail",
    path: ROUTE_PATHS.accountOrderDetail,
    page: "OrderDetailPage",
    jdReference: "Order tracking detail view",
  },
  {
    id: "account-addresses",
    path: ROUTE_PATHS.accountAddresses,
    page: "AddressesPage",
    jdReference: "Saved addresses management",
  },
  {
    id: "account-payment-methods",
    path: ROUTE_PATHS.accountPaymentMethods,
    page: "PaymentMethodsPage",
    jdReference: "Saved payment methods management",
  },
  {
    id: "account-wishlist",
    path: ROUTE_PATHS.accountWishlist,
    page: "WishlistPage",
    jdReference: "Saved products list",
  },

  // Support and legal
  {
    id: "help",
    path: ROUTE_PATHS.help,
    page: "HelpPage",
    jdReference: "FAQ and customer support hub",
  },
  {
    id: "order-tracking",
    path: ROUTE_PATHS.orderTracking,
    page: "OrderTrackingPage",
    jdReference: "Track order utility",
  },
  {
    id: "shipping-returns",
    path: ROUTE_PATHS.shippingReturns,
    page: "ShippingReturnsPage",
    jdReference: "Shipping and return policies",
  },
  {
    id: "contact",
    path: ROUTE_PATHS.contact,
    page: "ContactPage",
    jdReference: "Customer contact channels",
  },
  {
    id: "legal-notice",
    path: ROUTE_PATHS.legalNotice,
    page: "LegalNoticePage",
    jdReference: "Legal entity information",
  },
  {
    id: "privacy-policy",
    path: ROUTE_PATHS.privacyPolicy,
    page: "PrivacyPolicyPage",
    jdReference: "Privacy and data policy",
  },
  {
    id: "terms",
    path: ROUTE_PATHS.terms,
    page: "TermsPage",
    jdReference: "Terms and conditions",
  },
  {
    id: "accessibility",
    path: ROUTE_PATHS.accessibility,
    page: "AccessibilityPage",
    jdReference: "Accessibility statement",
  },
  {
    id: "site-map",
    path: ROUTE_PATHS.siteMap,
    page: "SiteMapPage",
    jdReference: "HTML sitemap page",
  },

  // System pages
  {
    id: "maintenance",
    path: ROUTE_PATHS.maintenance,
    page: "MaintenancePage",
    jdReference: "Maintenance fallback page",
  },
  {
    id: "error",
    path: ROUTE_PATHS.error,
    page: "ErrorPage",
    jdReference: "Unexpected server error page",
  },
  {
    id: "not-found",
    path: ROUTE_PATHS.notFound,
    page: "NotFoundPage",
    jdReference: "Explicit not-found page",
  },
];
