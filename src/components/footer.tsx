import Link from "next/link";
import { hygraphFetch } from "../lib/hygraph";
import { NAV_QUERY } from "../lib/queries";
import type { NavData, NavLink } from "../lib/types";

function linkHref(link: NavLink) {
  return link.externalUrl ?? `/${link.displayText.toLowerCase().replace(/ /g, "-")}`;
}

export async function Footer() {
  const data = await hygraphFetch<NavData>({ query: NAV_QUERY });
  const links = data.footer[0]?.navLink ?? [];

  return (
    <footer className="border-t border-gray-200 mt-16 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="font-bold tracking-tight">
          Store
        </Link>
        <div className="flex gap-6 text-sm">
          {links.map((link) => (
            <Link
              key={link.displayText}
              href={linkHref(link)}
              className="text-gray-500 hover:text-black transition-colors"
            >
              {link.displayText}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
