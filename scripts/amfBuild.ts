import {apis, parseRAMLtoAMF} from "./common";


(async () => {
    const requested = process.argv.slice(2);
    let apisToBuild = apis;
    if (requested.length > 0) {
        apisToBuild = requested
    }
    console.log(`APIs to build AMF for: ${apisToBuild}`);
    try {
        for (const api of apisToBuild) {
            await parseRAMLtoAMF(api);
        }
    } catch (e) {
        process.exit(1);
    }
})();