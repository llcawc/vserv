import { join, resolve } from 'node:path'
import { build } from 'vite'
const __dirname = resolve()

export default async function make({
  config,
  rootdir,
  pubdir,
  outdir,
  files,
}: {
  config?: string | undefined
  rootdir?: string | undefined
  pubdir?: string | undefined
  outdir?: string | undefined
  files?: string[] | undefined
} = {}) {
  if (config) {
    await build({
      configFile: config,
    })
  } else {
    if (rootdir) {
      rootdir = resolve(__dirname, rootdir)
    } else {
      rootdir = join(__dirname, 'src')
    }
    if (pubdir) {
      pubdir = resolve(__dirname, pubdir)
    } else {
      pubdir = join(__dirname, 'public')
    }
    if (outdir) {
      outdir = resolve(__dirname, outdir)
    } else {
      outdir = join(__dirname, 'dist')
    }
    if (!files) {
      files = ['./src/index.html', './src/main.ts']
    }

    await build({
      root: rootdir,
      publicDir: pubdir,
      build: {
        outDir: outdir,
        emptyOutDir: true,
        manifest: false,
        assetsInlineLimit: 0,
        modulePreload: false,
        rollupOptions: {
          input: files,
          output: {
            entryFileNames: 'js/[name].js',
            chunkFileNames: 'js/[name].js',
            assetFileNames: (assetInfo: any) => {
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
  }
}
