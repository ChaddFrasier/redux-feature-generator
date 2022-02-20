import * as fs from 'fs'
import * as path from 'path';
import { dispatch } from './generator';
import { lowercase, capitalize, replaceAll } from './helpers';

/**
 * I can get more specific errors eventually but a simple status will work for now 
 */
export const enum ARG_PARSER_STATUS {
    SUCCESS = 800,
    FAILURE,
    ARGERROR,
    HELP
}
const GeneratorTemplates = ["redux-typescript", "redux-javascript"]
const NAME_VALIDATOR = /\w*\W*/;

export const ArgParser = (argv: string[]): Promise<ARG_PARSER_STATUS> => {
    return new Promise<ARG_PARSER_STATUS>(resolve => {
        if(argv.length === 1 && ['-h', '--help'].includes(argv[0])) {
            resolve(ARG_PARSER_STATUS.HELP);
        }
        else if(argv.length === 0 || argv.length > 3) {
            resolve(ARG_PARSER_STATUS.ARGERROR);
        }
        else {

            console.log(process.cwd())
    
            let CONFIG = {
                featureNameUpperCase: "",
                featureName: "",
                projectPath: process.cwd(),
                template: ""
            }
    
            // Custom Name should be position 1
            if(NAME_VALIDATOR.test(argv[0])) {
                CONFIG.featureName = lowercase(argv[0])
                CONFIG.featureNameUpperCase = capitalize(argv[0])
            } else {
                resolve(ARG_PARSER_STATUS.FAILURE)
            }
    
            // The given path should exist
            if(argv[1] === "--template") {
                if(GeneratorTemplates.includes(argv[2])) {
                    CONFIG.template = argv[2];
                } else {
                    resolve(ARG_PARSER_STATUS.FAILURE)
                }
            }
    
            dispatch(CONFIG).then(files => {
                console.log(`Printed Files: ${replaceAll(files.toString(), ',', '\n')}`)
                resolve(ARG_PARSER_STATUS.SUCCESS)
            })
        }
    });
};