import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    // Configura esto para evitar que sirva index.html para rutas desconocidas
    historyApiFallback: false,
  },
  build: {
    // Configuración para copiar los archivos de actividades
    assetsInclude: ['**/*.html', '**/*.css', '**/*.js'],
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
  // Añadir esta configuración para servir archivos estáticos
  publicDir: 'public',
  // Configurar alias para acceder más fácilmente a las actividades
  resolve: {
    alias: {
      '@activities': resolve(__dirname, 'public/activities')
    }
  }
})