import { KBMember } from "../types";

export const cacheItem = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const clearCache = () => {
    localStorage.setItem('projects', JSON.stringify({}));
    const users: KBMember[] = JSON.parse(localStorage.getItem('users')!);
    users.map(user => user.projects = []);
    localStorage.setItem('users', JSON.stringify(users));
}