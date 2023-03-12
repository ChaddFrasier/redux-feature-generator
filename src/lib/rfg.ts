import { join, resolve } from "path";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { RFG_STATUS } from "./rfgArgs";
import { replaceAll, capitalize, lowercase } from "./helpers";

const templates = [
    resolve(__dirname, "../../templates/basic-typescript/template.module.css.tpl"),
    resolve(__dirname, "../../templates/basic-typescript/template.spec.ts.tpl"),
    resolve(__dirname, "../../templates/basic-typescript/Template.tsx.tpl"),
    resolve(__dirname, "../../templates/basic-typescript/templateAPI.ts.tpl"),
    resolve(__dirname, "../../templates/basic-typescript/templateSlice.ts.tpl")
]

export const dispatch = (args: any): RFG_STATUS =>
{
    let projectDirectory;

    if(args.length === 3) {
        projectDirectory = args[1]
    } else if(args.length === 2 && existsSync(args[1])) {
        projectDirectory = args[1]
    } else {
        projectDirectory = process.cwd() + "/src/features";
    }
    
    const outFiles = [
        join(`${projectDirectory}/${lowercase(args[0])}/${lowercase(args[0])}.module.css`),
        join(`${projectDirectory}/${lowercase(args[0])}/${lowercase(args[0])}.spec.ts`),
        join(`${projectDirectory}/${lowercase(args[0])}/${capitalize(args[0])}.tsx`),
        join(`${projectDirectory}/${lowercase(args[0])}/${lowercase(args[0])}API.ts`),
        join(`${projectDirectory}/${lowercase(args[0])}/${lowercase(args[0])}Slice.ts`)
    ]

    // Test to see if there is a src/features folder in the project directory
    if(existsSync(projectDirectory))
    {
        for(let i = 0; i < templates.length; i++)
        {
            if(existsSync(resolve(templates[i])))
            {
                let fileBuf = readFileSync(templates[i], {encoding: "utf-8"})
    
                fileBuf = replaceAll(
                    replaceAll(fileBuf, "${featureNameUppercase}", capitalize(args[0])),
                    "${featureNameLowercase}", args[0]
                );
                // Make sure the generation will work
                if(!existsSync(join(`${projectDirectory}/${args[0]}/`)))
                {
                    mkdirSync(join(`${projectDirectory}/${args[0]}/`));
                    process.stdout.write(`Writing File: ${outFiles[i]}\n`)
                    writeFileSync(outFiles[i], fileBuf, {encoding: "utf-8", flag: "w+"});
                } else {
                    process.stdout.write(`Writing File: ${outFiles[i]}\n`)
                    writeFileSync(outFiles[i], fileBuf, {encoding: "utf-8", flag: "w+"});
                }
            }
        }
        process.stdout.write("Generation Succeeded\n")
    } else {
        return RFG_STATUS.FOLDER_NOT_FOUND_ERROR;
    }

    return RFG_STATUS.OK
};