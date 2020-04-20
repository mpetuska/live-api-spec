import {readdirSync} from "fs";
import dotenv from "dotenv";
import path from "path";


dotenv.config();
export const ramlRoot = path.join(__dirname, '../src/raml');
export const ramlOutputRoot = path.join(__dirname, '../dist/raml');

export const ramlRoots = readdirSync(ramlRoot, {withFileTypes: true})
    .filter(f => f.isDirectory())
    .map(dir => dir.name);
export const apis = ramlRoots.filter(f => f !== '__common__')
