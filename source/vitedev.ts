import { join, resolve } from 'node:path'
import { createServer } from 'vite'
const __dirname = resolve()

export default async function dev(
  port: number | undefined = 8080,
  rootdir: string | undefined = undefined,
  pubdir: string | undefined = undefined
) {
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

  const server = await createServer({
    // any valid user config options, plus `mode` and `configFile`
    mode: 'development',
    envFile: false,
    configFile: false,
    root: rootdir,
    publicDir: pubdir,
    server: { port },
  })

  await server.listen()
  server.printUrls()
  server.bindCLIShortcuts({ print: true })
}
