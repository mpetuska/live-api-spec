import dotenv from "dotenv";
import {execSync} from "child_process";
import path from "path";
import {copyFileSync, readdirSync} from "fs";
// @ts-ignore
import replace from "replace";

dotenv.config();
const ramlRoot = path.join(__dirname, '../src/raml');
const ramlOutputRoot = path.join(__dirname, '../dist/raml');


async function buildConsole(name: string, baseUri: string) {
    const input = `${ramlRoot}/${name}/index.raml`;
    const output = `${ramlOutputRoot}/${name}/console`;
    console.log(`Input: ${input}`);
    console.log(`Output: ${output}`);
    execSync(
        `api-console build --no-cache -r baseUri:${baseUri}/${name} -a ${input} -t "RAML 1.0" -o ${output}`,
        {stdio: 'inherit'}
    );
    console.log(`Console ${name} built at ${output}`)
}

async function buildIndex(path: string, consoles: string[]) {
    const container = 'apis';
    const placeholder = '// %%APPEND%% //';
    const replacement = consoles.map((c) => `${container}['${c}'] = null;`).join('\n');
    replace({
        regex: placeholder,
        replacement,
        paths: [path]
    });
}


(async () => {
    const baseUri = process.env.BASE_URI;
    const apis = readdirSync(ramlRoot, {withFileTypes: true})
        .filter(f => f.isDirectory())
        .map(dir => dir.name);
    console.log(`Consoles to build: ${apis}`);
    for (const api of apis) {
        await buildConsole(api, baseUri);
    }
    const indexOutput = path.join(ramlOutputRoot, 'index.html');
    await copyFileSync(path.join(ramlRoot, 'index.html'), indexOutput);
    await buildIndex(indexOutput, apis);
})();