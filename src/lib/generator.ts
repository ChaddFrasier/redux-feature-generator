import {readFileSync, existsSync, writeFileSync, mkdir, mkdirSync} from 'fs';
import * as path from 'path';

export enum GEN_STATUS {
    SUCCESS=0,
    FAILURE
}
export declare type GeneratorConfig = {
    lang: string,
    frame: string,
    name: string,
    Cname: string,
    projectPath: string
}

function replaceAll(str: string, find: string, replace: string): string {
    var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, 'g'), replace);
}

export const dispatchGenerator = async (config: GeneratorConfig): Promise<GEN_STATUS> => {
    return new Promise(resolve => {
        console.log( new Date().getTime() + "Generation Dispatched")
        const files: string[] = [
            `${config.name}.module.css`,
            `${config.name}.spec.ts`,
            `${config.name}API.ts`,
            `${config.Cname}.tsx`,
            `${config.name}Slice.ts`
        ];

        const templates: string[] = [
            `template.module.css.tpl`,
            `template.spec.ts.tpl`,
            `templateAPI.ts.tpl`,
            `Template.tsx.tpl`,
            `templateSlice.ts.tpl`
        ];

        for(let i = 0; i < templates.length; i++) {
            const templatePath = path.join(`${__dirname}/../../templates/basic-typescript/${templates[i]}`);
            const outFolderPath = path.join(__dirname, config.projectPath);
            const outPath = path.join(__dirname, config.projectPath, files[i]);
            if(existsSync(templatePath)) {

                if(!existsSync(outFolderPath)) {
                    mkdirSync(outFolderPath);
                }

                let fileBuffer = readFileSync(templatePath, {encoding: 'utf-8'})
                fileBuffer = replaceAll(fileBuffer, "${featureNameLowercase}", config.name)
                fileBuffer = replaceAll(fileBuffer, "${featureNameUppercase}", config.Cname)
                writeFileSync(outPath, fileBuffer, {encoding: 'utf-8', flag: "w+"});
            } else {
                console.log("Could Not find all templates needed by generator");
                resolve(GEN_STATUS.FAILURE)
            }
        }

        resolve(GEN_STATUS.SUCCESS)
    });
}