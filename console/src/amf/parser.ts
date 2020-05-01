import {client, Core, model, parse, plugins, ProfileNames, render} from 'amf-client-js';
import {BASE_URI} from "../index";
import {SPromise, SuperPromise} from "./SuperPromise";

const apiCache: Record<string, SPromise<object[] | object>> = {}

const type = 'RAML 1.0';
const parser = new Promise<parse.Parser>(async (res) => {
    await plugins.document.WebApi.register();
    await plugins.document.Vocabularies.register();
    await plugins.features.AMFValidation.register();
    await Core.init();
    res(Core.parser(type, 'application/raml'))
})

export const validateRAML = async (parsedRAML: model.document.BaseUnit): Promise<client.validate.ValidationReport> => {
    const validator = await Core;
    return validator.validate(parsedRAML, ProfileNames.RAML);
}

export const parseRAML = async (apiName: string, isDev: boolean = false): Promise<object[] | object> => {
    if (apiCache[apiName] && !apiCache[apiName].isRejected()) {
        return apiCache[apiName];
    }
    let api: Promise<object[] | object>
    if (isDev) {
        api = new Promise(async (res, rej) => {
            const prs: any = await parser;
            const parsedRAML = await prs.parseFileAsync(`${BASE_URI}/raml/${apiName}/index.raml`);
            const validationResult = await validateRAML(parsedRAML);
            if (validationResult.conforms) {
                const resolver = Core.resolver(type);
                const resolvedDoc = resolver.resolve(parsedRAML, 'editing');
                const generator = Core.generator('AMF Graph', 'application/ld+json');
                const opts = new render.RenderOptions().withSourceMaps.withCompactUris;
                res(JSON.parse(await generator.generateString(resolvedDoc, opts)));
            } else {
                rej(validationResult.toString())
            }
        });
    } else {
        api = window.fetch(`${BASE_URI}/raml/${apiName}/index.json`).then(it => it.json());
    }
    api.catch(() => {
        delete apiCache[apiName]
    })
    apiCache[apiName] = SuperPromise(api);
    return api;
}