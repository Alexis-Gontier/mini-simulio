import { up } from 'up-fetch'

export const backendAPI = up(fetch, () => ({
    baseUrl: '',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    timeout: 15000,
}))