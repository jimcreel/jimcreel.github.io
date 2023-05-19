import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/jimcreel.github.io/',
  root: path.resolve(__dirname, 'frontend'),
  plugins: [react()],
})
