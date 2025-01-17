import { join, resolve } from 'node:path'
import { preview } from 'vite'
const __dirname = resolve()

export default async function serve(port: number | undefined = 8080, dist: string | undefined = undefined) {
  if (dist) {
    dist = resolve(__dirname, dist)
  } else {
    dist = join(__dirname, 'dist')
  }
  const previewServer = await preview({
    // any valid user config options, plus `mode` and `configFile`
    mode: 'development',
    build: {
      outDir: dist,
    },
    preview: {
      port,
      open: true,
    },
  })

  previewServer.printUrls()
  previewServer.bindCLIShortcuts({ print: true })
}
