"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function resolve(...paths) {
    return path_1.default.resolve(...paths);
}
exports.resolve = resolve;
function readJSON(path) {
    const raw = fs_1.default.readFileSync(path, 'utf-8').toString();
    return JSON.parse(raw);
}
exports.readJSON = readJSON;
function writeJSON(path, json) {
    const data = JSON.stringify(json, null, 2);
    fs_1.default.writeFileSync(path, data);
}
exports.writeJSON = writeJSON;
