export const cacheItem = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const clearCache = () => {
    localStorage.setItem('columns', JSON.stringify([]));
    localStorage.setItem('tasks', JSON.stringify([]));
}