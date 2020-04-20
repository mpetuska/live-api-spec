import {client, Core, model, parse, plugins, ProfileNames, render} from 'amf-client-js';
import {BASE_URI} from "../index";

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

export const parseRAML = async (apiName: string): Promise<object[] | object> => {
    const prs: any = await parser;
    const parsedRAML = await prs.parseFileAsync(`${BASE_URI}/raml/${apiName}/index.raml`);
    const validationResult = await validateRAML(parsedRAML);
    if (validationResult.conforms) {
        const resolver = Core.resolver(type);
        const resolvedDoc = resolver.resolve(parsedRAML, 'editing');
        const generator = Core.generator('AMF Graph', 'application/ld+json');
        const opts = new render.RenderOptions().withSourceMaps.withCompactUris;
        return JSON.parse(await generator.generateString(resolvedDoc, opts));
    } else {
        throw new Error(validationResult.toString())
    }
}