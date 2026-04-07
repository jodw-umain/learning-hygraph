export async function hygraphFetch<T>({
  query,
  variables,
  revalidate,
}: {
  query: string;
  variables?: Record<string, unknown>;
  revalidate?: number;
}): Promise<T> {
  const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT!;

  const res = await fetch(HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    ...(revalidate !== undefined && { next: { revalidate } }),
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(
      json.errors.map((e: { message: string }) => e.message).join("\n"),
    );
  }

  return json.data as T;
}
