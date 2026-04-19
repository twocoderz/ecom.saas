export type NavSubItem = {
  id: string;
  label: string;
  href: string;
};

export type NavMegaSection = {
  id: string;
  title: string;
  links: NavSubItem[];
};

export type NavFeaturedBlock = {
  title: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
};

export type NavItem = {
  id: string;
  label: string;
  href: string;
  sections: NavMegaSection[];
  featured?: NavFeaturedBlock;
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
    sections: [
      {
        id: "new-arrivals-gender",
        title: "SHOP BY GENDER",
        links: [
          { id: "new-men", label: "Men", href: "/c/men/all" },
          { id: "new-women", label: "Women", href: "/c/women/all" },
          { id: "new-boys", label: "Boys", href: "/c/kids/boys" },
          { id: "new-girls", label: "Girls", href: "/c/kids/girls" },
          {
            id: "new-all",
            label: "All New Arrivals",
            href: "/collection/new-arrivals",
          },
        ],
      },
      {
        id: "new-arrivals-brands",
        title: "NEW FROM BRANDS",
        links: [
          { id: "new-jordan", label: "Jordan", href: "/brand/jordan" },
          { id: "new-nike", label: "Nike", href: "/brand/nike" },
          { id: "new-asics", label: "ASICS", href: "/brand/asics" },
          {
            id: "new-balance",
            label: "New Balance",
            href: "/brand/new-balance",
          },
          { id: "new-adidas", label: "adidas", href: "/brand/adidas" },
          { id: "new-ugg", label: "UGG", href: "/brand/ugg" },
          { id: "new-owala", label: "Owala", href: "/brand/owala" },
          { id: "new-stanley", label: "Stanley", href: "/brand/stanley" },
        ],
      },
      {
        id: "new-arrivals-most-wanted",
        title: "MOST WANTED",
        links: [
          {
            id: "only-at-jd",
            label: "Only at JD",
            href: "/collection/only-at-jd",
          },
          {
            id: "soccer-styles",
            label: "Soccer Styles",
            href: "/collection/soccer-styles",
          },
          {
            id: "recent-releases-link",
            label: "Recent Releases",
            href: "/collection/recent-releases",
          },
          {
            id: "nb-9060",
            label: "New Balance 9060",
            href: "/collection/new-balance-9060",
          },
          {
            id: "jordan-retros",
            label: "Jordan Retros",
            href: "/collection/jordan-retros",
          },
          {
            id: "adidas-samba",
            label: "adidas Samba",
            href: "/collection/adidas-samba",
          },
          {
            id: "retro-running",
            label: "Retro Running Shoes",
            href: "/collection/retro-running-shoes",
          },
          {
            id: "nike-dunks",
            label: "Nike Dunks",
            href: "/collection/nike-dunks",
          },
          {
            id: "low-profile",
            label: "Low Profile & Sneakerina",
            href: "/collection/low-profile-sneakers",
          },
        ],
      },
      {
        id: "new-arrivals-seasonal",
        title: "GIFTS & SEASONAL",
        links: [
          {
            id: "pastel-styles",
            label: "Pastel Styles",
            href: "/collection/pastel-styles",
          },
          {
            id: "festival-fits",
            label: "Festival Fits",
            href: "/collection/festival-fits",
          },
          {
            id: "spring-essentials",
            label: "Spring Essentials",
            href: "/collection/spring-essentials",
          },
          {
            id: "mothers-day",
            label: "Mother's Day Gifts",
            href: "/collection/mothers-day-gifts",
          },
          {
            id: "triple-white",
            label: "Triple White Sneakers",
            href: "/collection/triple-white-sneakers",
          },
          {
            id: "gifts-under-100",
            label: "Gifts Under $100",
            href: "/collection/gifts-under-100",
          },
        ],
      },
    ],
    featured: {
      title: "Recent Releases",
      href: "/collection/recent-releases",
      imageAlt: "Recent releases",
    },
  },
  {
    id: "men",
    label: "Men",
    href: "/c/men/all",
    sections: [
      {
        id: "men-shop",
        title: "SHOP MEN",
        links: [
          { id: "men-all", label: "All Men", href: "/c/men/all" },
          { id: "men-shoes", label: "Men Shoes", href: "/c/men/shoes" },
          {
            id: "men-clothing",
            label: "Men Clothing",
            href: "/c/men/clothing",
          },
          {
            id: "men-accessories",
            label: "Men Accessories",
            href: "/c/men/accessories",
          },
        ],
      },
      {
        id: "men-brands",
        title: "TOP BRANDS",
        links: [
          { id: "men-nike", label: "Nike", href: "/brand/nike" },
          { id: "men-jordan", label: "Jordan", href: "/brand/jordan" },
          {
            id: "men-new-balance",
            label: "New Balance",
            href: "/brand/new-balance",
          },
          { id: "men-adidas", label: "adidas", href: "/brand/adidas" },
        ],
      },
      {
        id: "men-trending",
        title: "TRENDING",
        links: [
          {
            id: "men-best-sellers",
            label: "Best Sellers",
            href: "/collection/best-sellers-men",
          },
          {
            id: "men-new-arrivals",
            label: "New Arrivals",
            href: "/collection/new-arrivals-men",
          },
          {
            id: "men-retro",
            label: "Retro Styles",
            href: "/collection/retro-styles-men",
          },
        ],
      },
      {
        id: "men-seasonal",
        title: "SEASONAL",
        links: [
          {
            id: "men-spring",
            label: "Spring Essentials",
            href: "/collection/spring-essentials-men",
          },
          {
            id: "men-festival",
            label: "Festival Fits",
            href: "/collection/festival-fits-men",
          },
        ],
      },
    ],
  },
  {
    id: "women",
    label: "Women",
    href: "/c/women/all",
    sections: [
      {
        id: "women-shop",
        title: "SHOP WOMEN",
        links: [
          { id: "women-all", label: "All Women", href: "/c/women/all" },
          {
            id: "women-shoes",
            label: "Women Shoes",
            href: "/c/women/shoes",
          },
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
        ],
      },
      {
        id: "women-brands",
        title: "TOP BRANDS",
        links: [
          { id: "women-nike", label: "Nike", href: "/brand/nike" },
          {
            id: "women-new-balance",
            label: "New Balance",
            href: "/brand/new-balance",
          },
          { id: "women-adidas", label: "adidas", href: "/brand/adidas" },
          { id: "women-hoka", label: "HOKA", href: "/brand/hoka" },
        ],
      },
      {
        id: "women-trending",
        title: "TRENDING",
        links: [
          {
            id: "women-best-sellers",
            label: "Best Sellers",
            href: "/collection/best-sellers-women",
          },
          {
            id: "women-new-arrivals",
            label: "New Arrivals",
            href: "/collection/new-arrivals-women",
          },
          {
            id: "women-trending-styles",
            label: "Trending Styles",
            href: "/collection/trending-women",
          },
        ],
      },
      {
        id: "women-seasonal",
        title: "SEASONAL",
        links: [
          {
            id: "women-festival",
            label: "Festival Fits",
            href: "/collection/festival-fits-women",
          },
          {
            id: "women-pastel",
            label: "Pastel Styles",
            href: "/collection/pastel-styles",
          },
        ],
      },
    ],
  },
  {
    id: "kids",
    label: "Kids",
    href: "/c/kids/all",
    sections: [
      {
        id: "kids-shop",
        title: "SHOP KIDS",
        links: [
          { id: "kids-all", label: "All Kids", href: "/c/kids/all" },
          { id: "kids-shoes", label: "Kids Shoes", href: "/c/kids/shoes" },
          {
            id: "kids-clothing",
            label: "Kids Clothing",
            href: "/c/kids/clothing",
          },
          {
            id: "kids-accessories",
            label: "Kids Accessories",
            href: "/c/kids/accessories",
          },
        ],
      },
      {
        id: "kids-trending",
        title: "TRENDING",
        links: [
          {
            id: "kids-new",
            label: "New For Kids",
            href: "/collection/new-kids",
          },
          {
            id: "kids-back-to-school",
            label: "Back to School",
            href: "/collection/back-to-school-kids",
          },
        ],
      },
    ],
  },
  {
    id: "clothing",
    label: "Clothing",
    href: "/c/all/clothing",
    sections: [
      {
        id: "clothing-core",
        title: "CLOTHING",
        links: [
          { id: "hoodies", label: "Hoodies", href: "/c/all/hoodies" },
          { id: "tees", label: "Tees", href: "/c/all/tees" },
          { id: "jackets", label: "Jackets", href: "/c/all/jackets" },
          {
            id: "sets",
            label: "Matching Sets",
            href: "/collection/matching-sets",
          },
        ],
      },
    ],
  },
  {
    id: "accessories",
    label: "Accessories",
    href: "/c/all/accessories",
    sections: [
      {
        id: "accessories-core",
        title: "ACCESSORIES",
        links: [
          { id: "bags", label: "Bags", href: "/c/all/bags" },
          { id: "hats", label: "Hats", href: "/c/all/hats" },
          { id: "socks", label: "Socks", href: "/c/all/socks" },
          { id: "gear", label: "Gear", href: "/c/all/accessories" },
        ],
      },
    ],
  },
  {
    id: "sale",
    label: "Sale",
    href: "/collection/all-sale",
    sections: [
      {
        id: "sale-core",
        title: "SALE",
        links: [
          {
            id: "sale-shoes",
            label: "Sale Shoes",
            href: "/c/all/sale-shoes",
          },
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
          {
            id: "under-100",
            label: "Under 100",
            href: "/collection/under-100",
          },
        ],
      },
    ],
  },
  {
    id: "brands",
    label: "Brands",
    href: "/brand/featured",
    sections: [
      {
        id: "brands-core",
        title: "SHOP BY BRAND",
        links: [
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
    ],
  },
  {
    id: "sneaker-releases",
    label: "Sneaker Releases",
    href: "/collection/sneaker-releases",
    sections: [
      {
        id: "releases-core",
        title: "SNEAKER RELEASES",
        links: [
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
          {
            id: "alerts",
            label: "Drop Alerts",
            href: "/collection/drop-alerts",
          },
        ],
      },
    ],
  },
];
