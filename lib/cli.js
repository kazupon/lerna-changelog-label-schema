"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const meow_1 = __importDefault(require("meow"));
const index_1 = require("./commands/index");
const debug_1 = require("debug");
const debug = debug_1.debug('lerna-changelog-label-schema:cli');
async function run(argv = []) {
    const options = {
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
    };
    if (argv.length > 0) {
        options.argv = argv;
    }
    const cli = meow_1.default(`
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
  `, options);
    const command = cli.input.pop() || '';
    debug('command:', command);
    const { preset, output } = cli.flags;
    debug('flags:', cli.flags);
    if (['define', 'd'].includes(command)) { // define command
        await index_1.define({ preset, cwd: process.cwd() });
    }
    else if (['generate', 'g'].includes(command)) { // generate command
        await index_1.generate({ preset, output });
    }
    else if (['version', 'v'].includes(command)) { // version command
        console.log(cli.pkg.version);
    }
    else { // help!
        console.log(cli.help);
    }
    return cli;
}
exports.run = run;
