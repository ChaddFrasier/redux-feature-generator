#!/usr/bin/env node
import  * as fs from "fs";
import path from 'path';
import { generateContextHelp, capitalize, lowercase, replaceAll } from "./lib/helpers";

const GeneratorTemplates = ["redux-typescript", "redux-javascript"];
const NAME_VALIDATOR = /^[^*|\":<>[\]{}`\\()0-9\-';@&$]+$/;
const argv = process.argv.splice(process.execArgv.length + 2);

if(argv.length === 1 && ['-h', '--help'].includes(argv[0])) {
    process.stdout.write(generateContextHelp())
    process.exit(0);
}
else if(argv.length === 1 && ['-v', '--version'].includes(argv[0])) {
    const cfg = require("../package.json");
    process.stdout.write(`redux-feature-generator: v${cfg.version}`)
    process.exit(0);
}
else if(argv.length === 0 || argv.length > 3) {
    process.stdout.write(`Argument Error:\n ${generateContextHelp()}`);
    process.exit(0);
}
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
}