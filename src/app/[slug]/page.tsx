import { notFound } from "next/navigation";
import { Stripes } from "../../components/stripes";
import { hygraphFetch } from "../../lib/hygraph";
import { DYNAMIC_LANDING_QUERY } from "../../lib/queries";
import type { DynamicLandingData } from "../../lib/types";

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { landingPage } = await hygraphFetch<DynamicLandingData>({
    query: DYNAMIC_LANDING_QUERY,
    variables: { link: slug },
  });

  if (!landingPage) notFound();

  return (
    <main className="space-y-16">
      <h1 className="text-3xl font-bold">{landingPage.landingPageTitle}</h1>
      <Stripes stripes={landingPage.stripes} />
    </main>
  );
}
