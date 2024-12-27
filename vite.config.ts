import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer';
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: false })
  ],
  base: '/HQ-Inventory-app/',
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'certs/server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'certs/server.crt')),
    },
    host: '0.0.0.0', // これで全てのネットワークインターフェースでリッスン
    port: 5173,
  }
})
