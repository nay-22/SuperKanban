export const cacheItem = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
}