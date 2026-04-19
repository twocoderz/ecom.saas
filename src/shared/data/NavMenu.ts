export type NavSubItem = {
  id: string;
  label: string;
  href: string;
};

export type NavItem = {
  id: string;
  label: string;
  href: string;
  children: NavSubItem[];
};

/**
 * Source de verite du menu principal.
 * Chaque entree correspond a un item niveau 1 du header avec ses sous-categories.
 */
export const navMenuItems: NavItem[] = [
  {
    id: "new-arrivals",
    label: "New Arrivals",
    href: "/collection/new-arrivals",
    children: [
      { id: "latest-shoes", label: "Latest Shoes", href: "/c/all/shoes" },
      {
        id: "latest-clothing",
        label: "Latest Clothing",
        href: "/c/all/clothing",
      },
      {
        id: "latest-accessories",
        label: "Latest Accessories",
        href: "/c/all/accessories",
      },
      {
        id: "latest-drops",
        label: "Fresh Drops",
        href: "/collection/new-arrivals",
      },
    ],
  },
  {
    id: "men",
    label: "Men",
    href: "/c/men/all",
    children: [
      { id: "men-shoes", label: "Men Shoes", href: "/c/men/shoes" },
      { id: "men-clothing", label: "Men Clothing", href: "/c/men/clothing" },
      {
        id: "men-accessories",
        label: "Men Accessories",
        href: "/c/men/accessories",
      },
      {
        id: "men-best-sellers",
        label: "Best Sellers",
        href: "/collection/best-sellers-men",
      },
    ],
  },
  {
    id: "women",
    label: "Women",
    href: "/c/women/all",
    children: [
      { id: "women-shoes", label: "Women Shoes", href: "/c/women/shoes" },
      {
        id: "women-clothing",
        label: "Women Clothing",
        href: "/c/women/clothing",
      },
      {
        id: "women-accessories",
        label: "Women Accessories",
        href: "/c/women/accessories",
      },
      {
        id: "women-trending",
        label: "Trending",
        href: "/collection/trending-women",
      },
    ],
  },
  {
    id: "kids",
    label: "Kids",
    href: "/c/kids/all",
    children: [
      { id: "kids-shoes", label: "Kids Shoes", href: "/c/kids/shoes" },
      { id: "kids-clothing", label: "Kids Clothing", href: "/c/kids/clothing" },
      {
        id: "kids-accessories",
        label: "Kids Accessories",
        href: "/c/kids/accessories",
      },
      { id: "kids-new", label: "New For Kids", href: "/collection/new-kids" },
    ],
  },
  {
    id: "clothing",
    label: "Clothing",
    href: "/c/all/clothing",
    children: [
      { id: "hoodies", label: "Hoodies", href: "/c/all/hoodies" },
      { id: "tees", label: "Tees", href: "/c/all/tees" },
      { id: "jackets", label: "Jackets", href: "/c/all/jackets" },
      { id: "sets", label: "Matching Sets", href: "/collection/matching-sets" },
    ],
  },
  {
    id: "accessories",
    label: "Accessories",
    href: "/c/all/accessories",
    children: [
      { id: "bags", label: "Bags", href: "/c/all/bags" },
      { id: "hats", label: "Hats", href: "/c/all/hats" },
      { id: "socks", label: "Socks", href: "/c/all/socks" },
      { id: "gear", label: "Gear", href: "/c/all/accessories" },
    ],
  },
  {
    id: "sale",
    label: "Sale",
    href: "/collection/all-sale",
    children: [
      { id: "sale-shoes", label: "Sale Shoes", href: "/c/all/sale-shoes" },
      {
        id: "sale-clothing",
        label: "Sale Clothing",
        href: "/c/all/sale-clothing",
      },
      {
        id: "sale-accessories",
        label: "Sale Accessories",
        href: "/c/all/sale-accessories",
      },
      { id: "under-100", label: "Under 100", href: "/collection/under-100" },
    ],
  },
  {
    id: "brands",
    label: "Brands",
    href: "/brand/featured",
    children: [
      { id: "brand-nike", label: "Nike", href: "/brand/nike" },
      { id: "brand-adidas", label: "adidas", href: "/brand/adidas" },
      { id: "brand-jordan", label: "Jordan", href: "/brand/jordan" },
      {
        id: "brand-new-balance",
        label: "New Balance",
        href: "/brand/new-balance",
      },
    ],
  },
  {
    id: "sneaker-releases",
    label: "Sneaker Releases",
    href: "/collection/sneaker-releases",
    children: [
      {
        id: "release-calendar",
        label: "Release Calendar",
        href: "/collection/sneaker-releases",
      },
      {
        id: "jordans",
        label: "Jordan Releases",
        href: "/collection/jordan-releases",
      },
      {
        id: "nike-releases",
        label: "Nike Releases",
        href: "/collection/nike-releases",
      },
      { id: "alerts", label: "Drop Alerts", href: "/collection/drop-alerts" },
    ],
  },
];
