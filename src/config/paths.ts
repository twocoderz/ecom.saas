export const ROUTE_PREFIXES = {
  plp: "/plp",
  pdp: "/pdp",
} as const;

export const ROUTE_PATHS = {
  home: "/",

  category: `${ROUTE_PREFIXES.plp}/:slug`,
  categoryLegacy: "/c/:department/:category",
  search: "/search",
  brand: "/brand/:slug",
  collection: "/collection/:slug",
  product: `${ROUTE_PREFIXES.pdp}/:descriptiveSlug/:productId`,
  productLegacy: "/p/:productSlug",

  cart: "/cart",
  checkoutInfo: "/checkout/information",
  checkoutShipping: "/checkout/shipping",
  checkoutPayment: "/checkout/payment",
  checkoutConfirmation: "/checkout/confirmation",

  auth: "/auth",
  forgotPassword: "/auth/forgot-password",
  accountDashboard: "/account",
  accountOrders: "/account/orders",
  accountOrderDetail: "/account/orders/:orderId",
  accountAddresses: "/account/addresses",
  accountPaymentMethods: "/account/payment-methods",
  accountWishlist: "/account/wishlist",

  help: "/help",
  orderTracking: "/track-order",
  shippingReturns: "/shipping-returns",
  contact: "/contact",
  legalNotice: "/legal-notice",
  privacyPolicy: "/privacy-policy",
  terms: "/terms",
  accessibility: "/accessibility",
  siteMap: "/site-map",

  maintenance: "/maintenance",
  error: "/500",
  notFound: "/404",
} as const;

export const SEARCH_QUERY_KEY = "q";

/**
 * Construit la destination de recherche avec query string normalisee.
 */
export function buildSearchDestination(query: string): {
  pathname: string;
  search: string;
} {
  const nextParams = new URLSearchParams();
  const trimmed = query.trim();

  if (trimmed) {
    nextParams.set(SEARCH_QUERY_KEY, trimmed);
  }

  return {
    pathname: ROUTE_PATHS.search,
    search: nextParams.toString(),
  };
}
