export const apiUrl = import.meta.env.VITE_ENV === 'production'
  ? import.meta.env.VITE_API_URL_PROD
  : import.meta.env.VITE_API_URL_TEST;