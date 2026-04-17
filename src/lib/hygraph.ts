export async function hygraphFetch<T>({
  query,
  variables,
  revalidate,
  tags = ["hygraph"],
}: {
  query: string;
  variables?: Record<string, unknown>;
  revalidate?: number;
  tags?: string[];
}): Promise<T> {
  const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT!;
  const HYGRAPH_AUTH_TOKEN = process.env.HYGRAPH_DEV_AUTH_TOKEN;

  const res = await fetch(HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(HYGRAPH_AUTH_TOKEN && {
        Authorization: `Bearer ${HYGRAPH_AUTH_TOKEN}`,
      }),
    },
    body: JSON.stringify({ query, variables }),
    next: { tags, ...(revalidate !== undefined && { revalidate }) },
  });

  const json = await res.json();

  if (json.errors) {
    throw new Error(
      json.errors.map((e: { message: string }) => e.message).join("\n"),
    );
  }

  return json.data as T;
}
