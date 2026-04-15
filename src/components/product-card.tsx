import Image from "next/image";
import Link from "next/link";

export function ProductCard({
  product,
}: {
  product: {
    productName: string;
    productSlug: string;
    productPrice: number;
    productImage: { url: string; width: number; height: number }[];
  };
}) {
  return (
    <Link
      href={`/products/${product.productSlug}`}
      className="group block border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
    >
      {product.productImage?.[0] && (
        <div className="aspect-2/3 overflow-hidden bg-gray-100">
          <Image
            src={product.productImage[0].url}
            alt={product.productName}
            width={product.productImage[0].width}
            height={product.productImage[0].height}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold">{product.productName}</h3>
        <p className="text-gray-600 mt-1">${product.productPrice}</p>
      </div>
    </Link>
  );
}
