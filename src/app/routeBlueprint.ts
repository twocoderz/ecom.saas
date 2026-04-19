/**
 * Route blueprint for the whole storefront.
 * JD mapping: mirrors top journeys (Home -> PLP -> PDP -> Cart -> Checkout)
 * while staying generic for multi-category commerce.
 */
export type RouteBlueprintItem = {
  id: string
  path: string
  page: string
  jdReference: string
}

export const routeBlueprint: RouteBlueprintItem[] = [
  { id: 'home', path: '/', page: 'HomePage', jdReference: 'Homepage campaign and discovery rails' },
  { id: 'category', path: '/c/:department/:category', page: 'CategoryPage', jdReference: 'Category listing style (PLP)' },
  { id: 'search', path: '/search', page: 'SearchResultsPage', jdReference: 'Global search results' },
  { id: 'brand', path: '/brand/:slug', page: 'BrandPage', jdReference: 'Brand landing pages' },
  { id: 'collection', path: '/collection/:slug', page: 'CollectionPage', jdReference: 'Campaign and curated collections' },
  { id: 'product', path: '/p/:productSlug', page: 'ProductDetailPage', jdReference: 'Product detail page (PDP)' },
  { id: 'cart', path: '/cart', page: 'CartPage', jdReference: 'Bag / cart step before checkout' },
  { id: 'checkout-info', path: '/checkout/information', page: 'CheckoutInformationPage', jdReference: 'Checkout step: customer info' },
  { id: 'checkout-shipping', path: '/checkout/shipping', page: 'CheckoutShippingPage', jdReference: 'Checkout step: shipping method' },
  { id: 'checkout-payment', path: '/checkout/payment', page: 'CheckoutPaymentPage', jdReference: 'Checkout step: payment' },
  { id: 'checkout-confirmation', path: '/checkout/confirmation', page: 'CheckoutConfirmationPage', jdReference: 'Order confirmation' },
]
