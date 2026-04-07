import Link from "next/link";
import { hygraphFetch } from "../lib/hygraph";

type ShellsResponse = {
  shells: {
    id: string;
    title: string;
    shellSlug: string;
  }[];
};

export default async function Home() {
  const { shells } = await hygraphFetch<ShellsResponse>({
    query: `
      query Shells {
        shells {
          id
          title
          shellSlug
        }
      }
    `,
  });

  return (
    <main>
      <h1 className="uppercase">hello world</h1>
      <p>go to shells page hehehe</p>

      <ul>
        {shells.map((shell) => (
          <li key={shell.id}>
            <Link href={`/shells/${shell.shellSlug}`}>{shell.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
