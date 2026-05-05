import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3006,
    proxy: {
      '/eepip-api': {
        target: 'http://localhost:8089',
        changeOrigin: true,
      },
      '/temco-api': {
        target: 'http://localhost:8085',
        changeOrigin: true,
      },
    },
  },
})
