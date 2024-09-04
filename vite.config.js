import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      "/api":"https://webb-orbit.github.io/AIPDF-"
    }
  },
  plugins: [react()],
})
