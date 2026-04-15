const STRIPE_FIELDS = `
  stripes {
    __typename
    ... on CallToAction {
      heading
      body { html }
      image { url width height }
      button { text url }
    }
    ... on ProductGrid {
      headline
      description { html }
      products {
        productName
        productSlug
        productPrice
        productImage { url width height }
      }
    }
  }`;

export const HOME_LANDING_QUERY = `{
  landingPage(where: { link: "/" }) {
    landingPageTitle
    ${STRIPE_FIELDS}
    blogPosts {
      title
      body { html }
    }
    sellerInformation {
      businessName
      businessDescription { html }
      businessLogo { url }
    }
    productCategories {
      categoryName
    }
  }
}`;

export const DYNAMIC_LANDING_QUERY = `query Landing($link: String!) {
  landingPage(where: { link: $link }) {
    landingPageTitle
    ${STRIPE_FIELDS}
  }
}`;

export const PRODUCT_QUERY = `query Product($slug: String!) {
  product(where: { productSlug: $slug }) {
    productName
    productSlug
    productPrice
    productDescription { html }
    productImage { url width height }
    productCategories { categoryName slug }
  }
}`;

export const CATEGORY_QUERY = `query Category($slug: String!) {
  productCategory(where: { slug: $slug }) {
    categoryName
    description { html }
    products {
      productName
      productSlug
      productPrice
      productImage { url width height }
    }
  }
}`;

export const NAV_QUERY = `{
  main: navigations(where: { navId: "main" }) {
    navLink { displayText externalUrl }
  }
  footer: navigations(where: { navId: "footer" }) {
    navLink { displayText externalUrl }
  }
}`;
