import { up } from 'up-fetch'
import { ENV } from '@/utils/env';

export const simulatorApi = up(fetch, () => ({
    baseUrl: ENV.SIMULATOR_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000,
    retry: {
        attempts: 2,
        delay: 1000,
    },
    onError: (error, options) => {
        console.log('Error:', error, options)
    },
}))