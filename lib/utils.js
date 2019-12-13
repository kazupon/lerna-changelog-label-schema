"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
async function readJSON(path) {
    return await Promise.resolve().then(() => __importStar(require(path)));
}
exports.readJSON = readJSON;
async function writeJSON(path, json) {
    const data = JSON.stringify(json, null, 2);
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, err => {
            err ? reject(err) : resolve();
        });
    });
}
exports.writeJSON = writeJSON;
