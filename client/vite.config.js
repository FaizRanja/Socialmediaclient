import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000", // Replace with your backend URL
        changeOrigin: true, // Handle CORS
        secure: false, // Set false for development
        cookieDomainRewrite: "localhost", // Rewrite cookies domain
          withCredentials: true, // ✅ always send cookies

      },
    },
  },
})
