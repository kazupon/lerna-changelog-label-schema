import meow from 'meow'
import { resolve, readJSON, writeJSON } from './utils'

function applyToPacakge (pkg: any, preset: any) {
  return Object.assign(pkg, { changelog: { labels: preset }})
}

export function run (argv: string[] = []) {
  const options: meow.Options = {
    flags: {
      preset: {
        type: 'string',
        alias: 'p',
        default: 'default'
      }
    }
  }

  if (argv.length > 0) {
    options.argv = argv
  }

  const cli = meow(`
  Usage
    $ lerna-changelog-label-types
  Options
    --preset, -p Label type definition. 'default' or 'full'. default: 'default'
  Examples
    $ lerna-changelog-label-types

  `, options)

  const { preset } = cli.flags

  if (preset === 'default' || preset === 'full') {
    const fullPath = resolve(__dirname, `../preset/${preset}.json`)
    const presetJSON = readJSON(fullPath)
    const currentPath = resolve(process.cwd(), './package.json')
    const pkgJSON = readJSON(currentPath)
    const newPkgJSON = applyToPacakge(pkgJSON, presetJSON)
    writeJSON(currentPath, newPkgJSON)
    console.log(`apply lerna-changelog label preset '${preset}' to package.json`)
  }

  return cli
}
