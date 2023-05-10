import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/cms': 'https://kashiwasato.com/'
    }
  },
  plugins: [
    react(),
    AutoImport({
      imports: [
        'react',
        {
          from: 'react',
          imports: ['FC', 'PropsWithChildren'],
          type: true
        }
      ],
      dirs: ['./src/hooks', './src/components'],

    }),
    Unocss()
  ],
})
