import * as fs from 'fs'
import * as path from 'path'
import { replaceAll } from './helpers';

export const dispatch = (cfg: any): Promise<string[]> => {
    return new Promise(resolve => {
        const templates = [
            path.resolve("templates/basic-typescript/template.module.css.tpl"),
            path.resolve("templates/basic-typescript/template.spec.ts.tpl"),
            path.resolve("templates/basic-typescript/Template.tsx.tpl"),
            path.resolve("templates/basic-typescript/templateAPI.ts.tpl"),
            path.resolve("templates/basic-typescript/templateSlice.ts.tpl")
        ]
        const outFiles = [
            path.join(`${cfg.projectPath}/${cfg.featureName}/${cfg.featureName}.module.css`),
            path.join(`${cfg.projectPath}/${cfg.featureName}/${cfg.featureName}.spec.ts`),
            path.join(`${cfg.projectPath}/${cfg.featureName}/${cfg.featureNameUpperCase}.tsx`),
            path.join(`${cfg.projectPath}/${cfg.featureName}/${cfg.featureName}API.ts`),
            path.join(`${cfg.projectPath}/${cfg.featureName}/${cfg.featureName}Slice.ts`)
        ]
        
    
        for(let i = 0; i < templates.length; i++) {
            if(fs.existsSync(path.resolve(templates[i]))) {
                let fileBuf = fs.readFileSync(templates[i], {encoding: "utf-8"})
    
                fileBuf = replaceAll(
                    replaceAll(fileBuf, "${featureNameUppercase}", cfg.featureNameUpperCase),
                    "${featureNameLowercase}", cfg.featureName)
                // Make sure the generation will work
                if(!fs.existsSync(path.join(`${cfg.projectPath}/${cfg.featureName}/`))) {
                    fs.mkdirSync(path.join(`${cfg.projectPath}/${cfg.featureName}/`));
                }
                fs.writeFileSync(outFiles[i], fileBuf, {encoding: "utf-8", flag: "w"});
            }
        }

        resolve(outFiles)
    });
}