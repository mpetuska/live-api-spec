import express, {Express} from "express";
import cors from "cors";
import dotenv from 'dotenv';
// @ts-ignore
import mockService from "osprey-mock-service";
import path from "path";
import {readdirSync} from "fs";


dotenv.config();
const exp = express();
const PORT = process.env.APP_PORT;
const BASE_URI = process.env.BASE_URI;
const ramlRoot = path.join(__dirname, 'raml');

async function loadMockAPI(app: any, name: string) {
    const ramlIndex = path.join(__dirname, `raml/${name}/index.raml`);
    const mockAPI: any = await mockService.loadFile(ramlIndex, {baseUri: undefined});
    const router = express.Router();
    router.use(`/console`, express.static(path.join(__dirname, `raml/${name}/console`)));
    console.log(`Mounted ${name} console onto ${BASE_URI}/${name}/console`);
    router.use(`/`, mockAPI);
    console.log(`Mounted ${name} api mock onto ${BASE_URI}/${name}`);

    app.use(`/${name}`, router);
}

(async (app: Express) => {
    app.use(cors());
    const apis = readdirSync(ramlRoot, {withFileTypes: true})
        .filter(f => f.isDirectory())
        .map(dir => dir.name);
    for (const api of apis) {
        await loadMockAPI(app, api);
    }
    app.use('/', express.static(ramlRoot));
    app.listen(PORT);
    console.log(`MockService ready on ${BASE_URI}`);
    console.log(`Serving ${__dirname}`);
})(exp);