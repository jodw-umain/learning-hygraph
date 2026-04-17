import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) {
    return Response.json(
      { ok: false, error: "REVALIDATE_SECRET not set" },
      { status: 500 },
    );
  }

  const provided =
    request.headers.get("X-Revalidate-Secret") ??
    request.nextUrl.searchParams.get("secret");

  if (provided !== expected) {
    console.log("revalidate 401", {
      headers: Object.fromEntries(request.headers),
    });
    return Response.json({ ok: false }, { status: 401 });
  }

  revalidateTag("hygraph", { expire: 0 });
  return Response.json({ ok: true, revalidatedAt: Date.now() });
}
