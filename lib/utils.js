"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchFileContents = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const fetchFileContents = (pathToFile) => {
    try {
        const data = node_fs_1.default.readFileSync(pathToFile, 'utf8');
        return data.split('\n');
    }
    catch (err) {
        console.error(err);
        return [];
    }
};
exports.fetchFileContents = fetchFileContents;
