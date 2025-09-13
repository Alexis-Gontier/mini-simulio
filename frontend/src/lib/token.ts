const AUTH_TOKEN_KEY = 'authToken';

export const tokenUtils = {
    get: () => localStorage.getItem(AUTH_TOKEN_KEY),
    set: (token: string) => localStorage.setItem(AUTH_TOKEN_KEY, token),
    remove: () => localStorage.removeItem(AUTH_TOKEN_KEY),
    exists: () => !!localStorage.getItem(AUTH_TOKEN_KEY)
};

export function isAuthenticated(): boolean {
    return tokenUtils.exists();
}