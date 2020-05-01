// @ts-ignore
import {apis, validateRAMLFile} from "./common";


(async () => {
    const requested = process.argv.slice(2);
    let apisToLint = apis;
    if (requested.length > 0) {
        apisToLint = requested
    }
    console.log(`APIs to lint: ${apisToLint}`);
    let error = false;
    try {
        for (const api of apisToLint) {
            const validationResult = await validateRAMLFile(api);
            if (validationResult.conforms) {
                console.log(`RAML for [${api}] valid!`);
            } else {
                console.log(`RAML for [${api}] invalid!`, validationResult);
                error = true;
            }
        }
    } catch (e) {
        error = true;
        console.log(e);
    }
    if (error) {
        process.exit(1);
    } else {
        process.exit(0);
    }
})();