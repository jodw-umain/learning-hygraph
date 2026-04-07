import { hygraphFetch } from "@//lib/hygraph";

type ShellResponse = {
  shell: {
    title: string;
    shellSlug: string;
    shellAbilities: {
      abilityName: string;
      abilityDescription: string;
    }[];
  };
};

export default async function ShellPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const shellSlug = slug.join("/");

  const { shell } = await hygraphFetch<ShellResponse>({
    query: `
      query Shell($slug: String!) {
        shell(where: { shellSlug: $slug }) {
          title
          shellSlug
          shellAbilities {
          abilityName
          abilityDescription
          }
        }
      }
    `,
    variables: { slug: shellSlug },
  });

  return (
    <main>
      <h1>{shell.title}</h1>
      <p>Slug: {shell.shellSlug}</p>
      {shell.shellAbilities.map((ability) => {
        return (
          <div key={`ability-${ability.abilityName}`}>
            <h2>{ability.abilityName}</h2>
            <p>{ability.abilityDescription}</p>
          </div>
        );
      })}
    </main>
  );
}
