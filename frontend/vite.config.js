import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true // Этот параметр отвечает за автоматическое открытие браузера при запуске сервера
  }
})
