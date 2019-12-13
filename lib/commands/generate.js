"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const debug_1 = require("debug");
const debug = debug_1.debug('lerna-changelog-label-schema:commands:generate');
const generate = async (options) => {
    const { preset, output } = options;
    debug(`preset= ${preset}, output=${output}`);
    if (!(preset === 'default' || preset === 'full')) {
        return false;
    }
    const schema = await Promise.resolve().then(() => __importStar(require(`../schema/${preset}`)));
    const labels = schema.labels;
    const meta = schema.meta;
    debug('labels', labels);
    debug('meta', meta);
    const githubLabels = labels.map((label, index) => {
        const m = meta[index];
        if (m.type !== label.type) {
            throw new Error(`Invalid generating: label=${label.type}, meta=${m.type}, index=${index}`);
        }
        const ghLabel = {
            name: `Type: ${label.type}`,
            color: m.color
        };
        if (label.description) {
            ghLabel.description = label.description;
        }
        if (m.aliases) {
            ghLabel.aliases = m.aliases;
        }
        return ghLabel;
    });
    debug('githubLabels', githubLabels);
    let ret = true;
    if (output) {
        try {
            await utils_1.writeJSON(output, githubLabels);
        }
        catch (e) {
            console.error(e.message);
            ret = false;
        }
    }
    else {
        console.log(JSON.stringify(githubLabels, null, 2));
    }
    return ret;
};
exports.default = generate;
