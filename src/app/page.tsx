import Image from "next/image";
import Link from "next/link";
import { Stripes } from "../components/stripes";
import { hygraphFetch } from "../lib/hygraph";
import { HOME_LANDING_QUERY } from "../lib/queries";
import type { HomeLandingData } from "../lib/types";

export default async function Home() {
  const { landingPage } = await hygraphFetch<HomeLandingData>({
    query: HOME_LANDING_QUERY,
  });

  if (!landingPage) return <p>No landing page found.</p>;

  return (
    <main className="space-y-16 pb-16">
      <Stripes stripes={landingPage.stripes} />

      {landingPage.productCategories.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
          <div className="flex flex-wrap gap-3">
            {landingPage.productCategories.map((c) => (
              <Link
                key={c.categoryName}
                href={`/category/${c.categoryName.toLowerCase().replace(/ /g, "-")}`}
                className="px-5 py-3 bg-gray-100 rounded-full font-medium text-gray-700 hover:bg-gray-200 transition-colors"
              >
                {c.categoryName}
              </Link>
            ))}
          </div>
        </section>
      )}

      {landingPage.blogPosts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">From the Blog</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {landingPage.blogPosts.map((post) => (
              <article
                key={post.title}
                className="border border-gray-200 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <div
                  className="mt-3 text-gray-600 prose prose-sm"
                  dangerouslySetInnerHTML={{ __html: post.body.html }}
                />
              </article>
            ))}
          </div>
        </section>
      )}

      {landingPage.sellerInformation && (
        <section className="bg-gray-50 rounded-2xl p-8 flex items-center gap-6">
          <Image
            src={landingPage.sellerInformation.businessLogo.url}
            alt={landingPage.sellerInformation.businessName}
            width={80}
            height={80}
            className="rounded-full w-20 h-20 object-cover"
          />
          <div>
            <h2 className="text-xl font-bold">
              {landingPage.sellerInformation.businessName}
            </h2>
            <div
              className="mt-1 text-gray-600"
              dangerouslySetInnerHTML={{
                __html:
                  landingPage.sellerInformation.businessDescription.html,
              }}
            />
          </div>
        </section>
      )}
    </main>
  );
}
