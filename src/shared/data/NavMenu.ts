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
    label: "Nouveautés",
    href: "/collection/new-arrivals",
    sections: [
      {
        id: "new-arrivals-gender",
        title: "ACHETER PAR GENRE",
        links: [
          { id: "new-men", label: "Homme", href: "/c/men/all" },
          { id: "new-women", label: "Femme", href: "/c/women/all" },
          { id: "new-boys", label: "Garçon", href: "/c/kids/boys" },
          { id: "new-girls", label: "Fille", href: "/c/kids/girls" },
          {
            id: "new-all",
            label: "Toutes les nouveautés",
            href: "/collection/new-arrivals",
          },
        ],
      },
      {
        id: "new-arrivals-brands",
        title: "NOUVEAUTÉS PAR MARQUE",
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
        title: "LES PLUS DEMANDÉS",
        links: [
          {
            id: "only-at-jd",
            label: "Exclusivités",
            href: "/collection/only-at-jd",
          },
          {
            id: "soccer-styles",
            label: "Styles football",
            href: "/collection/soccer-styles",
          },
          {
            id: "recent-releases-link",
            label: "Sorties récentes",
            href: "/collection/recent-releases",
          },
          {
            id: "nb-9060",
            label: "New Balance 9060",
            href: "/collection/new-balance-9060",
          },
          {
            id: "jordan-retros",
            label: "Jordan Rétro",
            href: "/collection/jordan-retros",
          },
          {
            id: "adidas-samba",
            label: "adidas Samba",
            href: "/collection/adidas-samba",
          },
          {
            id: "retro-running",
            label: "Chaussures running rétro",
            href: "/collection/retro-running-shoes",
          },
          {
            id: "nike-dunks",
            label: "Nike Dunks",
            href: "/collection/nike-dunks",
          },
          {
            id: "low-profile",
            label: "Sneakers basses",
            href: "/collection/low-profile-sneakers",
          },
        ],
      },
      {
        id: "new-arrivals-seasonal",
        title: "CADEAUX & SAISON",
        links: [
          {
            id: "pastel-styles",
            label: "Styles pastel",
            href: "/collection/pastel-styles",
          },
          {
            id: "festival-fits",
            label: "Tenues festival",
            href: "/collection/festival-fits",
          },
          {
            id: "spring-essentials",
            label: "Essentiels printemps",
            href: "/collection/spring-essentials",
          },
          {
            id: "mothers-day",
            label: "Cadeaux fête des mères",
            href: "/collection/mothers-day-gifts",
          },
          {
            id: "triple-white",
            label: "Sneakers triple blanc",
            href: "/collection/triple-white-sneakers",
          },
          {
            id: "gifts-under-100",
            label: "Cadeaux moins de 60 000 F",
            href: "/collection/gifts-under-100",
          },
        ],
      },
    ],
    featured: {
      title: "Sorties récentes",
      href: "/collection/recent-releases",
      imageAlt: "Sorties récentes",
    },
  },
  {
    id: "men",
    label: "Homme",
    href: "/c/men/all",
    sections: [
      {
        id: "men-shop",
        title: "HOMME",
        links: [
          { id: "men-all", label: "Tout homme", href: "/c/men/all" },
          { id: "men-shoes", label: "Chaussures homme", href: "/c/men/shoes" },
          {
            id: "men-clothing",
            label: "Vêtements homme",
            href: "/c/men/clothing",
          },
          {
            id: "men-accessories",
            label: "Accessoires homme",
            href: "/c/men/accessories",
          },
        ],
      },
      {
        id: "men-brands",
        title: "TOP MARQUES",
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
        title: "TENDANCES",
        links: [
          {
            id: "men-best-sellers",
            label: "Meilleures ventes",
            href: "/collection/best-sellers-men",
          },
          {
            id: "men-new-arrivals",
            label: "Nouveautés",
            href: "/collection/new-arrivals-men",
          },
          {
            id: "men-retro",
            label: "Styles rétro",
            href: "/collection/retro-styles-men",
          },
        ],
      },
      {
        id: "men-seasonal",
        title: "SAISON",
        links: [
          {
            id: "men-spring",
            label: "Essentiels printemps",
            href: "/collection/spring-essentials-men",
          },
          {
            id: "men-festival",
            label: "Tenues festival",
            href: "/collection/festival-fits-men",
          },
        ],
      },
    ],
  },
  {
    id: "women",
    label: "Femme",
    href: "/c/women/all",
    sections: [
      {
        id: "women-shop",
        title: "FEMME",
        links: [
          { id: "women-all", label: "Tout femme", href: "/c/women/all" },
          {
            id: "women-shoes",
            label: "Chaussures femme",
            href: "/c/women/shoes",
          },
          {
            id: "women-clothing",
            label: "Vêtements femme",
            href: "/c/women/clothing",
          },
          {
            id: "women-accessories",
            label: "Accessoires femme",
            href: "/c/women/accessories",
          },
        ],
      },
      {
        id: "women-brands",
        title: "TOP MARQUES",
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
        title: "TENDANCES",
        links: [
          {
            id: "women-best-sellers",
            label: "Meilleures ventes",
            href: "/collection/best-sellers-women",
          },
          {
            id: "women-new-arrivals",
            label: "Nouveautés",
            href: "/collection/new-arrivals-women",
          },
          {
            id: "women-trending-styles",
            label: "Styles tendance",
            href: "/collection/trending-women",
          },
        ],
      },
      {
        id: "women-seasonal",
        title: "SAISON",
        links: [
          {
            id: "women-festival",
            label: "Tenues festival",
            href: "/collection/festival-fits-women",
          },
          {
            id: "women-pastel",
            label: "Styles pastel",
            href: "/collection/pastel-styles",
          },
        ],
      },
    ],
  },
  {
    id: "kids",
    label: "Enfant",
    href: "/c/kids/all",
    sections: [
      {
        id: "kids-shop",
        title: "ENFANT",
        links: [
          { id: "kids-all", label: "Tout enfant", href: "/c/kids/all" },
          { id: "kids-shoes", label: "Chaussures enfant", href: "/c/kids/shoes" },
          {
            id: "kids-clothing",
            label: "Vêtements enfant",
            href: "/c/kids/clothing",
          },
          {
            id: "kids-accessories",
            label: "Accessoires enfant",
            href: "/c/kids/accessories",
          },
        ],
      },
      {
        id: "kids-trending",
        title: "TENDANCES",
        links: [
          {
            id: "kids-new",
            label: "Nouveautés enfant",
            href: "/collection/new-kids",
          },
          {
            id: "kids-back-to-school",
            label: "Rentrée scolaire",
            href: "/collection/back-to-school-kids",
          },
        ],
      },
    ],
  },
  {
    id: "clothing",
    label: "Vêtements",
    href: "/c/all/clothing",
    sections: [
      {
        id: "clothing-core",
        title: "VÊTEMENTS",
        links: [
          { id: "hoodies", label: "Sweats", href: "/c/all/hoodies" },
          { id: "tees", label: "T-shirts", href: "/c/all/tees" },
          { id: "jackets", label: "Vestes", href: "/c/all/jackets" },
          {
            id: "sets",
            label: "Ensembles assortis",
            href: "/collection/matching-sets",
          },
        ],
      },
    ],
  },
  {
    id: "accessories",
    label: "Accessoires",
    href: "/c/all/accessories",
    sections: [
      {
        id: "accessories-core",
        title: "ACCESSOIRES",
        links: [
          { id: "bags", label: "Sacs", href: "/c/all/bags" },
          { id: "hats", label: "Casquettes", href: "/c/all/hats" },
          { id: "socks", label: "Chaussettes", href: "/c/all/socks" },
          { id: "gear", label: "Équipement", href: "/c/all/accessories" },
        ],
      },
    ],
  },
  {
    id: "sale",
    label: "Promos",
    href: "/collection/all-sale",
    sections: [
      {
        id: "sale-core",
        title: "PROMOS",
        links: [
          {
            id: "sale-shoes",
            label: "Chaussures en promo",
            href: "/c/all/sale-shoes",
          },
          {
            id: "sale-clothing",
            label: "Vêtements en promo",
            href: "/c/all/sale-clothing",
          },
          {
            id: "sale-accessories",
            label: "Accessoires en promo",
            href: "/c/all/sale-accessories",
          },
          {
            id: "under-100",
            label: "Moins de 60 000 F",
            href: "/collection/under-100",
          },
        ],
      },
    ],
  },
  {
    id: "brands",
    label: "Marques",
    href: "/brand/featured",
    sections: [
      {
        id: "brands-core",
        title: "ACHETER PAR MARQUE",
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
    label: "Sorties sneakers",
    href: "/collection/sneaker-releases",
    sections: [
      {
        id: "releases-core",
        title: "SORTIES SNEAKERS",
        links: [
          {
            id: "release-calendar",
            label: "Calendrier des sorties",
            href: "/collection/sneaker-releases",
          },
          {
            id: "jordans",
            label: "Sorties Jordan",
            href: "/collection/jordan-releases",
          },
          {
            id: "nike-releases",
            label: "Sorties Nike",
            href: "/collection/nike-releases",
          },
          {
            id: "alerts",
            label: "Alertes drops",
            href: "/collection/drop-alerts",
          },
        ],
      },
    ],
  },
];
