import { ProductCard } from "../../../components/product-card";
import { hygraphFetch } from "../../../lib/hygraph";
import { CATEGORY_QUERY } from "../../../lib/queries";
import type { CategoryData } from "../../../lib/types";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { productCategory } = await hygraphFetch<CategoryData>({
    query: CATEGORY_QUERY,
    variables: { slug },
  });

  if (!productCategory) return <p>Category not found.</p>;

  return (
    <main>
      <h1 className="text-3xl font-bold">{productCategory.categoryName}</h1>
      {productCategory.description?.html && (
        <div
          className="mt-2 text-gray-600"
          dangerouslySetInnerHTML={{ __html: productCategory.description.html }}
        />
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {productCategory.products.map((p) => (
          <ProductCard key={p.productSlug} product={p} />
        ))}
      </div>
    </main>
  );
}
