export const fetcher = async <JSON = any>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<JSON> => {
  const res = await fetch(input, init)
  return res.json()
}
