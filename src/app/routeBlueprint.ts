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
    path: "/",
    page: "HomePage",
    jdReference: "Homepage campaign and discovery rails",
  },

  // Catalog journey
  {
    id: "category",
    path: "/plp/:slug",
    page: "CategoryPage",
    jdReference: "Category listing style (PLP)",
  },
  {
    id: "category-legacy",
    path: "/c/:department/:category",
    page: "CategoryPage",
    jdReference: "Legacy listing alias kept during migration",
  },
  {
    id: "search",
    path: "/search",
    page: "SearchResultsPage",
    jdReference: "Global search results",
  },
  {
    id: "brand",
    path: "/brand/:slug",
    page: "BrandPage",
    jdReference: "Brand landing pages",
  },
  {
    id: "collection",
    path: "/collection/:slug",
    page: "CollectionPage",
    jdReference: "Campaign and curated collections",
  },
  {
    id: "product",
    path: "/pdp/:descriptiveSlug/:productId",
    page: "ProductDetailPage",
    jdReference: "Product detail page (PDP)",
  },
  {
    id: "product-legacy",
    path: "/p/:productSlug",
    page: "ProductDetailPage",
    jdReference: "Legacy PDP alias kept during migration",
  },

  // Cart and checkout
  {
    id: "cart",
    path: "/cart",
    page: "CartPage",
    jdReference: "Bag / cart step before checkout",
  },
  {
    id: "checkout-info",
    path: "/checkout/information",
    page: "CheckoutInformationPage",
    jdReference: "Checkout step: customer info",
  },
  {
    id: "checkout-shipping",
    path: "/checkout/shipping",
    page: "CheckoutShippingPage",
    jdReference: "Checkout step: shipping method",
  },
  {
    id: "checkout-payment",
    path: "/checkout/payment",
    page: "CheckoutPaymentPage",
    jdReference: "Checkout step: payment",
  },
  {
    id: "checkout-confirmation",
    path: "/checkout/confirmation",
    page: "CheckoutConfirmationPage",
    jdReference: "Order confirmation",
  },

  // Account journey
  {
    id: "auth",
    path: "/auth",
    page: "AuthPage",
    jdReference: "Account sign in / sign up entry",
  },
  {
    id: "forgot-password",
    path: "/auth/forgot-password",
    page: "ForgotPasswordPage",
    jdReference: "Password recovery flow",
  },
  {
    id: "account-dashboard",
    path: "/account",
    page: "AccountDashboardPage",
    jdReference: "Customer dashboard and shortcuts",
  },
  {
    id: "account-orders",
    path: "/account/orders",
    page: "OrdersPage",
    jdReference: "Order history list",
  },
  {
    id: "account-order-detail",
    path: "/account/orders/:orderId",
    page: "OrderDetailPage",
    jdReference: "Order tracking detail view",
  },
  {
    id: "account-addresses",
    path: "/account/addresses",
    page: "AddressesPage",
    jdReference: "Saved addresses management",
  },
  {
    id: "account-payment-methods",
    path: "/account/payment-methods",
    page: "PaymentMethodsPage",
    jdReference: "Saved payment methods management",
  },
  {
    id: "account-wishlist",
    path: "/account/wishlist",
    page: "WishlistPage",
    jdReference: "Saved products list",
  },

  // Support and legal
  {
    id: "help",
    path: "/help",
    page: "HelpPage",
    jdReference: "FAQ and customer support hub",
  },
  {
    id: "order-tracking",
    path: "/track-order",
    page: "OrderTrackingPage",
    jdReference: "Track order utility",
  },
  {
    id: "shipping-returns",
    path: "/shipping-returns",
    page: "ShippingReturnsPage",
    jdReference: "Shipping and return policies",
  },
  {
    id: "contact",
    path: "/contact",
    page: "ContactPage",
    jdReference: "Customer contact channels",
  },
  {
    id: "legal-notice",
    path: "/legal-notice",
    page: "LegalNoticePage",
    jdReference: "Legal entity information",
  },
  {
    id: "privacy-policy",
    path: "/privacy-policy",
    page: "PrivacyPolicyPage",
    jdReference: "Privacy and data policy",
  },
  {
    id: "terms",
    path: "/terms",
    page: "TermsPage",
    jdReference: "Terms and conditions",
  },
  {
    id: "accessibility",
    path: "/accessibility",
    page: "AccessibilityPage",
    jdReference: "Accessibility statement",
  },
  {
    id: "site-map",
    path: "/site-map",
    page: "SiteMapPage",
    jdReference: "HTML sitemap page",
  },

  // System pages
  {
    id: "maintenance",
    path: "/maintenance",
    page: "MaintenancePage",
    jdReference: "Maintenance fallback page",
  },
  {
    id: "error",
    path: "/500",
    page: "ErrorPage",
    jdReference: "Unexpected server error page",
  },
  {
    id: "not-found",
    path: "/404",
    page: "NotFoundPage",
    jdReference: "Explicit not-found page",
  },
];
