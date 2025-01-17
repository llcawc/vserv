import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    manifest: false,
    assetsInlineLimit: 0,
    modulePreload: false,
    rollupOptions: {
      input: ['./src/index.html', './src/404.html', './src/scripts/main.ts'],
      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name].js',
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').pop()
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'images'
          }
          if (/ttf|eot|woff2?/i.test(extType)) {
            extType = 'fonts'
          }
          return `${extType}/[name][extname]`
        },
      },
    },
  },
})
