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
    console.log(`APIs to lint: ${apis}`);
    for (const api of apis) {
        await validateRAML(api);
    }
})();