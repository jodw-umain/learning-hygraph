export type HygraphImage = { url: string; width: number; height: number };

export type ProductSummary = {
  productName: string;
  productSlug: string;
  productPrice: number;
  productImage: HygraphImage[];
};

export type CallToAction = {
  __typename: "CallToAction";
  heading: string;
  body: { html: string } | null;
  image: HygraphImage | null;
  button: { text: string; url: string } | null;
};

export type ProductGridStripe = {
  __typename: "ProductGrid";
  headline: string;
  description: { html: string } | null;
  products: ProductSummary[];
};

export type Stripe = CallToAction | ProductGridStripe;

export type HomeLandingData = {
  landingPage: {
    landingPageTitle: string;
    stripes: Stripe[];
    blogPosts: { title: string; body: { html: string } }[];
    sellerInformation: {
      businessName: string;
      businessDescription: { html: string };
      businessLogo: { url: string };
    } | null;
    productCategories: { categoryName: string }[];
  } | null;
};

export type DynamicLandingData = {
  landingPage: {
    landingPageTitle: string;
    stripes: Stripe[];
  } | null;
};

export type ProductData = {
  product: {
    productName: string;
    productSlug: string;
    productPrice: number;
    productDescription: { html: string } | null;
    productImage: HygraphImage[];
    productCategories: { categoryName: string; slug: string }[];
  } | null;
};

export type CategoryData = {
  productCategory: {
    categoryName: string;
    description: { html: string } | null;
    products: ProductSummary[];
  } | null;
};

export type NavLink = { displayText: string; externalUrl: string | null };

export type NavData = {
  main: { navLink: NavLink[] }[];
  footer: { navLink: NavLink[] }[];
};
