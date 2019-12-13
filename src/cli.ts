import meow from 'meow'
import define from './commands/define'

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
    version, v     show the version

  Options:
    --preset, -p   Label schema preset option, for define and generate command. 'default' or 'full', default: 'default'
  
  Examples:
    $ lerna-changelog-label-schema define --preset=full
  `, options)

  const command = cli.input.pop() || ''
  debug('command:', command)
  const { preset } = cli.flags
  debug('flags:', cli.flags)

  if (['define', 'd'].includes(command)) { // define command
    await define({ preset, cwd: process.cwd() })
  } else if (['version', 'v'].includes(command)) { // version command
    console.log(cli.pkg.version)
  } else { // help!
    console.log(cli.help)
  }

  return cli
}
