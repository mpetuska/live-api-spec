// @ts-ignore
import mockService from "osprey-mock-service";
import express, {Express} from "express";
import cors from "cors";
import dotenv from 'dotenv';
import path from "path";
import {readdirSync} from "fs";


dotenv.config();
const exp = express();
const PORT = process.env.APP_PORT || 5001;
const BASE_URI = `http://localhost:${PORT}`;
const PRODUCTION = process.env.NODE_ENV !== 'development'
const PUBLIC_DIR = PRODUCTION ? './public/' : '../console/build/';
const ramlRoot = path.join(__dirname, PRODUCTION ? './raml/' : '../raml/');

async function loadMockAPI(app: any, name: string) {
    const ramlIndex = path.join(ramlRoot, `${name}/index.raml`);
    const mockAPI: any = await mockService.loadFile(ramlIndex, {baseUri: undefined});
    const router = express.Router();
    router.use(`/`, mockAPI);
    console.log(`Mounted ${name} api mock onto ${BASE_URI}/${name}`);

    app.use(`/${name}`, router);
}

(async (app: Express) => {
    app.use(cors());
    const apis = readdirSync(ramlRoot, {withFileTypes: true})
        .filter(f => f.isDirectory() && f.name !== '__common__')
        .map(dir => dir.name);
    for (const api of apis) {
        await loadMockAPI(app, api);
    }
    app.use('/raml', express.static(ramlRoot));
    const apiMap: Record<string, string> = {};
    apis.forEach((api: string) => apiMap[api] = api);
    app.route('/raml').get(((_, res) => {
        res.header('access-control-expose-headers', 'x-dev');
        res.header('x-dev', `${!PRODUCTION}`);
        res.json(apiMap);
    }));

    app.get('/_*', (_, res) => {
        res.sendFile(path.resolve(__dirname, PUBLIC_DIR, 'index.html'));
    });
    app.use('/', express.static(path.join(__dirname, PUBLIC_DIR)));

    app.listen(PORT);
    console.log(`MockService ready on ${BASE_URI}`);
    console.log(`Serving ${__dirname}`);
})(exp);