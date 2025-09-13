export const ENV = {
  NODE_ENV: import.meta.env.MODE || 'development' as 'development' | 'production' | 'test',

  FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173' as string,
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000' as string,
  SIMULATOR_URL: import.meta.env.VITE_SIMULATOR_URL || 'http://localhost:5000' as string,
} as const