import Link from "next/link";
import { hygraphFetch } from "../lib/hygraph";
import { NAV_QUERY } from "../lib/queries";
import type { NavData, NavLink } from "../lib/types";

function linkHref(link: NavLink) {
  return link.externalUrl ?? `/${link.displayText.toLowerCase().replace(/ /g, "-")}`;
}

export async function Nav() {
  const data = await hygraphFetch<NavData>({ query: NAV_QUERY });
  const links = data.main[0]?.navLink ?? [];

  return (
    <nav className="border-b border-gray-200 mb-8">
      <div className="max-w-6xl mx-auto flex items-center gap-8 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Store
        </Link>
        <div className="flex gap-6 text-sm">
          {links.map((link) => (
            <Link
              key={link.displayText}
              href={linkHref(link)}
              className="text-gray-600 hover:text-black transition-colors"
            >
              {link.displayText}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
