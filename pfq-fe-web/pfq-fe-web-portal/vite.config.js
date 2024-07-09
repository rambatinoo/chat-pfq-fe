import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['bcryptjs',
      'react/jsx-dev-runtime',
      'react',
      'react-dom/client',
      '@mui/material',
      'socket.io-client'
    ]
  }
})
