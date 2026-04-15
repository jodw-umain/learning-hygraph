import Image from "next/image";
import Link from "next/link";
import type { Stripe } from "../lib/types";
import { ProductCard } from "./product-card";

export function Stripes({ stripes }: { stripes: Stripe[] }) {
  return (
    <>
      {stripes.map((stripe, i) => {
        if (stripe.__typename === "CallToAction") {
          return (
            <section
              key={i}
              className="relative rounded-2xl overflow-hidden bg-gray-900 text-white"
            >
              {stripe.image && (
                <Image
                  src={stripe.image.url}
                  alt={stripe.heading}
                  width={stripe.image.width}
                  height={stripe.image.height}
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
              )}
              <div className="relative z-10 px-8 py-20 md:px-16 md:py-28 max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  {stripe.heading}
                </h2>
                {stripe.body?.html && (
                  <div
                    className="mt-4 text-lg text-gray-200"
                    dangerouslySetInnerHTML={{ __html: stripe.body.html }}
                  />
                )}
                {stripe.button && (
                  <Link
                    href={stripe.button.url}
                    className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    {stripe.button.text}
                  </Link>
                )}
              </div>
            </section>
          );
        }

        return (
          <section key={i}>
            <h2 className="text-2xl font-bold mb-6">{stripe.headline}</h2>
            {stripe.description?.html && (
              <div
                className="text-gray-600 mb-6"
                dangerouslySetInnerHTML={{ __html: stripe.description.html }}
              />
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {stripe.products.map((p) => (
                <ProductCard key={p.productSlug} product={p} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
