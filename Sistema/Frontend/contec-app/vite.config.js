import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 1234,  // definir a porta para 808

    proxy: {
      // Qualquer requisição que comece  com /cgi-bin será redirecionada
      '/cgi-bin': {
        target: 'http://192.168.14.7',
        changeOrigin: true, // Essencial para o proxy funcionar
      }
    }
   }

})
