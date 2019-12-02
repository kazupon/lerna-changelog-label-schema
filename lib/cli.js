"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const meow_1 = __importDefault(require("meow"));
const utils_1 = require("./utils");
function applyToPacakge(pkg, preset) {
    return Object.assign(pkg, { changelog: { labels: preset } });
}
function run(argv = []) {
    const options = {
        flags: {
            preset: {
                type: 'string',
                alias: 'p',
                default: 'default'
            }
        }
    };
    if (argv.length > 0) {
        options.argv = argv;
    }
    const cli = meow_1.default(`
  Usage
    $ lerna-changelog-label-types
  Options
    --preset, -p Label type definition. 'default' or 'full'. default: 'default'
  Examples
    $ lerna-changelog-label-types

  `, options);
    const { preset } = cli.flags;
    if (preset === 'default' || preset === 'full') {
        const fullPath = utils_1.resolve(__dirname, `../preset/${preset}.json`);
        const presetJSON = utils_1.readJSON(fullPath);
        const currentPath = utils_1.resolve(process.cwd(), './package.json');
        const pkgJSON = utils_1.readJSON(currentPath);
        const newPkgJSON = applyToPacakge(pkgJSON, presetJSON);
        utils_1.writeJSON(currentPath, newPkgJSON);
        console.log(`apply lerna-changelog label preset '${preset}' to package.json`);
    }
    return cli;
}
exports.run = run;
