#!/usr/bin/env node
import  * as fs from 'fs';
import path from 'path';
import { capitalize, lowercase, replaceAll } from "./lib/helpers";

import { dispatch } from './lib/rfg';
import { rfgArgs, RFG_STATUS } from './lib/rfgArgs';

const args = rfgArgs.read(process.argv.splice(process.execArgv.length + 2));

switch(args.status) {
    case RFG_STATUS.HELP:
        console.log(rfgArgs.help());
        process.exit(0);
    case RFG_STATUS.VERSION:
        console.log(rfgArgs.version(require("../package.json")));
        process.exit(0);
    case RFG_STATUS.ERROR:
        console.log(`Argument Error:\n ${rfgArgs.help()}`);
        process.exit(2);
    case RFG_STATUS.GO:
        console.log(dispatch(args.argv));
        process.exit(0);
    default:
        process.exit(1);
}
/* 
else {
    let CONFIG = {
        featureNameUpperCase: "",
        featureName: "",
        projectPath: `${process.cwd()}/src/features`,
        template: ""
    };
    process.stdout.write("\nValidating Input ...\n")

    // Custom Name should be position 1
    if(NAME_VALIDATOR.test(argv[0])) {  
        CONFIG.featureName = lowercase(argv[0]);
        CONFIG.featureNameUpperCase = capitalize(argv[0]);
    }else {
        process.stdout.write("Naming Convention Error: You need to input a name that could be accpeted as a file location");
        process.exit(0);
    }

    if(argv[1] === "--template") {
        if(GeneratorTemplates.includes(argv[2])) {
            CONFIG.template = argv[2];
        } else {
            process.stdout.write("Template Error: Accepted template codes include 'redux-typescript'")
            process.exit(0);
        }
    }

    process.stdout.write("Validating Input Succeeded\n")

    const templates = [
        path.resolve(__dirname, "templates/basic-typescript/template.module.css.tpl"),
        path.resolve(__dirname, "templates/basic-typescript/template.spec.ts.tpl"),
        path.resolve(__dirname, "templates/basic-typescript/Template.tsx.tpl"),
        path.resolve(__dirname, "templates/basic-typescript/templateAPI.ts.tpl"),
        path.resolve(__dirname, "templates/basic-typescript/templateSlice.ts.tpl")
    ]
    const outFiles = [
        path.join(`${CONFIG.projectPath}/${CONFIG.featureName}/${CONFIG.featureName}.module.css`),
        path.join(`${CONFIG.projectPath}/${CONFIG.featureName}/${CONFIG.featureName}.spec.ts`),
        path.join(`${CONFIG.projectPath}/${CONFIG.featureName}/${CONFIG.featureNameUpperCase}.tsx`),
        path.join(`${CONFIG.projectPath}/${CONFIG.featureName}/${CONFIG.featureName}API.ts`),
        path.join(`${CONFIG.projectPath}/${CONFIG.featureName}/${CONFIG.featureName}Slice.ts`)
    ]

    process.stdout.write("Beginning Generation ...\n")

    if(fs.existsSync(CONFIG.projectPath)) {
        for(let i = 0; i < templates.length; i++) {
            if(fs.existsSync(path.resolve(templates[i]))) {
                let fileBuf = fs.readFileSync(templates[i], {encoding: "utf-8"})
    
                fileBuf = replaceAll(
                    replaceAll(fileBuf, "${featureNameUppercase}", CONFIG.featureNameUpperCase),
                    "${featureNameLowercase}", CONFIG.featureName)
                // Make sure the generation will work
                if(!fs.existsSync(path.join(`${CONFIG.projectPath}/${CONFIG.featureName}/`))) {
                    fs.mkdirSync(path.join(`${CONFIG.projectPath}/${CONFIG.featureName}/`));
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
    process.exit(0);
} */