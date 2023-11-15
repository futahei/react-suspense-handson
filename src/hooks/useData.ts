const dataMap: Map<string, unknown> = new Map();

export function useData<T>(cachedKey: string, fetch: () => Promise<T>): T {
  const cachedData = dataMap.get(cachedKey) as T | undefined;
  if (cachedData === undefined) {
    throw fetch().then((d) => dataMap.set(cachedKey, d));
  }
  return cachedData;
}
