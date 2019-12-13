"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const utils_1 = require("../utils");
const debug_1 = require("debug");
const debug = debug_1.debug('lerna-changelog-label-schema:commands:define');
const define = async (options) => {
    const { preset, cwd } = options;
    debug(`preset= ${preset}, cwd=${cwd}`);
    if (!(preset === 'default' || preset === 'full')) {
        return false;
    }
    if (!cwd) {
        return false;
    }
    const schema = await Promise.resolve().then(() => __importStar(require(`../schema/${preset}`)));
    const labels = schema.labels;
    debug('labels', labels);
    let pkgPath = '';
    let pkgJSON = {};
    try {
        pkgPath = path.resolve(cwd, './package.json');
        pkgJSON = require(pkgPath);
        debug('pkgJSON', pkgJSON);
    }
    catch (e) {
        return false;
    }
    // TODO: shoudl be typed changelogCaptions
    const changelogCaptions = labels.reduce((captions, label) => {
        captions[`Type: ${label.type}`] = `${label.emoji} ${label.caption}`;
        return captions;
    }, {});
    debug('changelogCaptions', changelogCaptions);
    const newPkgJSON = applyToPacakge(pkgJSON, changelogCaptions);
    debug('newPkgJson', newPkgJSON);
    utils_1.writeJSON(pkgPath, newPkgJSON);
    console.log(`apply lerna-changelog label '${preset}' schema to package.json`);
    return true;
};
function applyToPacakge(pkg, labels) {
    return Object.assign(pkg, { changelog: { labels } });
}
exports.default = define;
