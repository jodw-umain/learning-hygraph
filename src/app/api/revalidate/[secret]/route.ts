import { revalidateTag } from "next/cache";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ secret: string }> },
) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) {
    return Response.json(
      { ok: false, error: "REVALIDATE_SECRET not set" },
      { status: 500 },
    );
  }

  const { secret } = await params;
  if (secret !== expected) {
    return Response.json({ ok: false }, { status: 401 });
  }

  revalidateTag("hygraph", { expire: 0 });
  return Response.json({ ok: true, revalidatedAt: Date.now() });
}
