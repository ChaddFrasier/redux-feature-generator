import path from "path";
import fs from 'fs';
import { RFG_STATUS } from "./rfgArgs";
import { replaceAll, capitalize, lowercase } from "./helpers";

const templates = [
    path.resolve(__dirname, "../../templates/basic-typescript/template.module.css.tpl"),
    path.resolve(__dirname, "../../templates/basic-typescript/template.spec.ts.tpl"),
    path.resolve(__dirname, "../../templates/basic-typescript/Template.tsx.tpl"),
    path.resolve(__dirname, "../../templates/basic-typescript/templateAPI.ts.tpl"),
    path.resolve(__dirname, "../../templates/basic-typescript/templateSlice.ts.tpl")
]

export const dispatch = (args: any): RFG_STATUS => {
    const projectDirectory = process.cwd();

    
    const outFiles = [
        path.join(`${projectDirectory}/${lowercase(args[0])}/${lowercase(args[0])}.module.css`),
        path.join(`${projectDirectory}/${lowercase(args[0])}/${lowercase(args[0])}.spec.ts`),
        path.join(`${projectDirectory}/${lowercase(args[0])}/${capitalize(args[0])}.tsx`),
        path.join(`${projectDirectory}/${lowercase(args[0])}/${lowercase(args[0])}API.ts`),
        path.join(`${projectDirectory}/${lowercase(args[0])}/${lowercase(args[0])}Slice.ts`)
    ]

    // Test to see if there is a src/features folder in the project directory

        // if there is a src/features pass and generate athe feature code
        // otherwise fail and explain why the failure happened 

        if(fs.existsSync(projectDirectory)) {
            for(let i = 0; i < templates.length; i++) {
                if(fs.existsSync(path.resolve(templates[i]))) {
                    let fileBuf = fs.readFileSync(templates[i], {encoding: "utf-8"})
        
                    fileBuf = replaceAll(
                        replaceAll(fileBuf, "${featureNameUppercase}", capitalize(args[0])),
                        "${featureNameLowercase}", args[0])
                    // Make sure the generation will work
                    if(!fs.existsSync(path.join(`${projectDirectory}/${args[0]}/`))) {
                        fs.mkdirSync(path.join(`${projectDirectory}/${args[0]}/`));
                        process.stdout.write(`Writing File: ${outFiles[i]}\n`)
                        fs.writeFileSync(outFiles[i], fileBuf, {encoding: "utf-8", flag: "w+"});
                    } else {
                        process.stdout.write(`Writing File: ${outFiles[i]}\n`)
                        fs.writeFileSync(outFiles[i], fileBuf, {encoding: "utf-8", flag: "w+"});
                    }
                }
            }
            process.stdout.write("Generation Succeeded\n")
        }

    return RFG_STATUS.GO
};