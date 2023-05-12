export function json<T = unknown>(
  data: T,
  config?: Partial<ResponseInit>
): Response {
  return new Response(JSON.stringify(data), {
    ...config,
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  })
}
