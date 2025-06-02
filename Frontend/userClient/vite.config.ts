import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
import svgLoader from 'vite-svg-loader'

const stripComments = (html: string) => html.replace(/<!--[\s\S]*?-->/g, '');

// https://vitejs.dev/config/
export default defineConfig(({command})=>({
  plugins: [
    vue(),
    svgLoader({
      svgo: false
    }),
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
  base: command === 'build' ? '/static/' : '', 
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
  }
}))
