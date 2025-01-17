import { Command } from 'commander'
import build from './vitebuild.js'
import dev from './vitedev.js'
import serve from './viteview.js'
const program = new Command()

const header = '\n• Vite based live server for static files\n  vserv v.1.0.0\n'
const footer = '\nMIT License ©2025 pasmurno by llcawc. Made with ❤  to beautiful architecture.'

program.name('$ vserv').usage('command [options]')
program.addHelpText('before', header).addHelpText('after', footer)

program
  .command('dev', { isDefault: true })
  .description('launch live web server for development')
  .option('-p, --port <n>', 'server port number (default: 8080)')
  .option('-r, --root [value]', 'folder for serve files (default: src)')
  .option('-s, --pub [value]', 'folder for static files (default: public)')
  .action((opt) => {
    dev(opt.port, opt.root, opt.pub)
  })

program
  .command('serve')
  .description('preview web server')
  .option('-p, --port <n>', 'server port number (default: 8080)')
  .option('-d, --dist [value]', 'folder for serve files (default: dist)')
  .action((opt) => {
    serve(opt.port, opt.dist)
  })

program
  .command('build')
  .description('build web server for production')
  .option('-c, --conf [value]', 'config file name (default: vite.config.js )')
  .option('-r, --root [value]', 'folder for serve files (default: src)')
  .option('-s, --pub [value]', 'folder for static files (default: public)')
  .option('-o, --out [value]', 'folder for productions files (default: dist)')
  .option('-f, --file [files...]', 'specify inputs files (default: ./src/index.html ./src/main.ts)')
  .action((opt) => {
    if (opt.conf === true || (!opt.conf && !opt.root && !opt.pub && !opt.out && !opt.file)) {
      opt.conf = 'vite.config.js'
      console.log('\nDefault configuration file used: vite.config.js\n')
    }
    const config = {
      config: opt.conf,
      rootdir: opt.root,
      pubdir: opt.pub,
      outdir: opt.out,
      files: opt.file,
    }
    build(config)
  })

program.parse(process.argv)
