import Image from "next/image";
import Link from "next/link";
import { hygraphFetch } from "../../../lib/hygraph";
import { PRODUCT_QUERY } from "../../../lib/queries";
import type { ProductData } from "../../../lib/types";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { product } = await hygraphFetch<ProductData>({
    query: PRODUCT_QUERY,
    variables: { slug },
  });

  if (!product) return <p>Product not found.</p>;

  return (
    <main className="grid md:grid-cols-2 gap-12">
      {product.productImage?.[0] && (
        <div className="aspect-[2/3] bg-gray-100 rounded-2xl overflow-hidden">
          <Image
            src={product.productImage[0].url}
            alt={product.productName}
            width={product.productImage[0].width}
            height={product.productImage[0].height}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="flex flex-col justify-center">
        <div className="flex gap-2 mb-4">
          {product.productCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
            >
              {c.categoryName}
            </Link>
          ))}
        </div>
        <h1 className="text-3xl font-bold">{product.productName}</h1>
        <p className="text-2xl text-gray-600 mt-2">${product.productPrice}</p>
        {product.productDescription?.html && (
          <div
            className="mt-6 text-gray-700 prose"
            dangerouslySetInnerHTML={{ __html: product.productDescription.html }}
          />
        )}
      </div>
    </main>
  );
}
