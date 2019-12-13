import meow from 'meow'
import { define, generate } from './commands/index'

import { debug as Debug } from 'debug'
const debug = Debug('lerna-changelog-label-schema:cli')

export async function run (argv: string[] = []) {
  const options: meow.Options = {
    flags: {
      preset: {
        type: 'string',
        alias: 'p',
        default: 'default'
      },
      output: {
        type: 'string',
        alias: 'o'
      }
    }
  }

  if (argv.length > 0) {
    options.argv = argv
  }

  const cli = meow(`
  Usage
    $ lerna-changelog-label-schema <command> [options]
  
  Commands:
    define, d      define lerna-changelog labels in your package.json 
    generate, g    generate lerna-changelog labels for GitHub labels, output for stdout
    version, v     show the version

  Options:
    --preset, -p   Label schema preset option, for define and generate command. 'default' or 'full', default: 'default'
    --output, -o   Output option, for generate command. if specified, stdout is suppressed.
  
  Examples:
    $ lerna-changelog-label-schema define --preset=full
    $ lerna-changelog-label-schema generate --preset=default
  `, options)

  const command = cli.input.pop() || ''
  debug('command:', command)
  const { preset, output } = cli.flags
  debug('flags:', cli.flags)

  if (['define', 'd'].includes(command)) { // define command
    await define({ preset, cwd: process.cwd() })
  } else if (['generate', 'g'].includes(command)) { // generate command
    await generate({ preset, output })
  } else if (['version', 'v'].includes(command)) { // version command
    console.log(cli.pkg.version)
  } else { // help!
    console.log(cli.help)
  }

  return cli
}
