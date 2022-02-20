import * as fs from 'fs'
import { resolve } from 'path';
import { dispatch, capitalize, lowercase } from './generator';
/**
 * I can get more specific errors eventually but a simple status will work for now 
 */
export const enum ARG_PARSER_STATUS {
    SUCCESS = 800,
    FAILURE,
    HELP
}

const GeneratorTemplates = ["redux-typescript", "redux-javascript"]

const NAME_VALIDATOR = /\w*\W*/;

export const ArgParser = (argv: string[]): ARG_PARSER_STATUS => {
    if(argv.length === 1 && ['-h', '--help'].includes(argv[0])) {
        return ARG_PARSER_STATUS.HELP
    }
    if(argv.length < 2 || argv.length > 4) {
        return ARG_PARSER_STATUS.FAILURE    
    } else {

        let CONFIG = {
            featureNameUpperCase: "",
            featureName: "",
            projectPath: "",
            template: ""
        }

        // Custom Name should be position 1
        if(NAME_VALIDATOR.test(argv[0])) {
            CONFIG.featureName = lowercase(argv[0])
            CONFIG.featureNameUpperCase = capitalize(argv[0])
        } else {
            return ARG_PARSER_STATUS.FAILURE
        }

        // The given path should exist
        if(fs.existsSync(argv[1])) {
            if(fs.existsSync(argv[1]+"/src/features/")) {
                CONFIG.projectPath = resolve(argv[1] + "/src/features");
            } else {
                return ARG_PARSER_STATUS.FAILURE
            }
        } else {
            return ARG_PARSER_STATUS.FAILURE
        }

        // The given path should exist
        if(argv[2] === "--template") {
            if(GeneratorTemplates.includes(argv[3])) {
                CONFIG.template = argv[3];
            } else {
                return ARG_PARSER_STATUS.FAILURE
            }
        }

        dispatch(CONFIG)
        return ARG_PARSER_STATUS.SUCCESS
    }
}

export const generateContextHelp = () => {
    let helpString = "";
    helpString = "redux-feature-generator:\t\tA simple command line tool to speed up the time it takes to setup a new redux feature.\n\n";
    helpString = helpString.concat(
        "\t-h --help\t\t\t\tPrint command help.\n",
        "\tcustomeName\t\t\t\tThe name of your new feature.\n",
        "\toutPath\t\t\t\t\tThe path that the generated files will be placed.\n",
        "\t--template <template>\t\tThe template structure you would like use for generation.\n\n"
        );
    return helpString;
}