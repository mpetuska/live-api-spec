// @ts-ignore
import {execSync} from "child_process";
import {apis, ramlRoot} from "./common";

async function validateRAML(name: string) {
    const input = `${ramlRoot}/${name}/index.raml`;
    console.log(`Validating RAML API: ${input}`);
    execSync(
        `raml validate ${input}`,
        {stdio: 'inherit'}
    );
}

(async () => {
    const requested = process.argv.slice(2);
    let apisToLint = apis;
    if (requested.length > 0) {
        apisToLint = requested
    }
    console.log(`APIs to lint: ${apisToLint}`);
    for (const api of apisToLint) {
        await validateRAML(api);
    }
})();