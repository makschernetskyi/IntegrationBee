import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

const stripComments = (html: string) => html.replace(/<!--[\s\S]*?-->/g, '');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'html-transform', // Custom plugin name
      transformIndexHtml(html: string) {
        // Only remove comments in production build
        if (process.env.NODE_ENV === 'production') {
          return stripComments(html);
        }
        return html;
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    // rollupOptions:{
    //   output:{
    //     assetFileNames: "[name]-[hash][extname]",
    //     entryFileNames: "[name]-[hash].js"
    //   }
    // }
  }
})
