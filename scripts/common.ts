import {mkdirSync, readdirSync, writeFileSync} from "fs";
import {client, Core, model, parse, plugins, ProfileNames, render} from 'amf-client-js';
// @ts-ignore
import dotenv from "dotenv";
// @ts-ignore
import path from "path";


dotenv.config();
export const ramlRoot = path.join(__dirname, '../raml');
export const ramlOutputRoot = path.join(__dirname, '../build/raml');

export const ramlRoots = readdirSync(ramlRoot, {withFileTypes: true})
    .filter(f => f.isDirectory())
    .map(dir => dir.name);
export const apis = ramlRoots.filter(f => f !== '__common__')

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

export const parseRAMLFile = async (apiName: string): Promise<model.document.BaseUnit> => {
    const prs: any = await parser;
    const input = `file://${ramlRoot}/${apiName}/index.raml`;
    return await prs.parseFileAsync(input);
}

export const validateRAMLFile = async (apiName: string): Promise<client.validate.ValidationReport> => {
    return await validateRAML(await parseRAMLFile(apiName));
}

export const parseRAMLtoAMF = async (apiName: string): Promise<string> => {
    const parsedRAML = await parseRAMLFile(apiName);
    const validationResult = await validateRAML(parsedRAML);
    if (validationResult.conforms) {
        const resolver = Core.resolver(type);
        const resolvedDoc = resolver.resolve(parsedRAML, 'editing');
        const generator = Core.generator('AMF Graph', 'application/ld+json');
        const opts = new render.RenderOptions().withSourceMaps.withCompactUris;
        const str = await generator.generateString(resolvedDoc, opts);
        const dir = `${ramlOutputRoot}/${apiName}`;
        const file = `${dir}/index.json`;
        mkdirSync(dir, {recursive: true})
        writeFileSync(file, str);
        console.log(`Built AMF for ${apiName} at ${file}`)
        return file;
    } else {
        console.log(`Invalid RAML File for [${apiName}]`)
        throw new Error(validationResult.toString())
    }
}
