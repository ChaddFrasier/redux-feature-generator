/**
 * TODO
 */
import { existsSync } from 'fs'
import path from 'path';
import { validName } from './helpers';

/**
 * TODO
 */
export enum RFG_STATUS {
    OK=0,
    VERSION,
    HELP,
    ERROR,
    UNKNOWN_ERROR=400,
    FEATURE_NAMING_ERROR,
    UNKNOWN_FLAG_ERROR,
    FOLDER_NOT_FOUND_ERROR, 
};
/**
 * TODO
 */
export declare type ArgumentPayload = {
    status: RFG_STATUS,
    argv: string[]
};

const MAX_ARGUMENT_LIMIT = 4

/**
 * TODO
 * @param argv 
 * @returns 
 */
const readArgs = (argv: string[]): ArgumentPayload => {
    let readStatus: RFG_STATUS = RFG_STATUS.UNKNOWN_ERROR;
    const templateTypesArr = [
        "redux-typescript",
        "redux-javascript"
    ];
    const argsArr: string[] = [];

    /**
     * Fail on incorrect length of argv
     */
    if(argv.length === 0 || argv.length > MAX_ARGUMENT_LIMIT) { 
        return createStatusPayload(RFG_STATUS.ERROR, "Error: Incorrect Amount of Arguments")
    }
    
    for ( let index = 0; index < argv.length; index++ ) {
        const cliArgListItem = argv[index];
        let isOption = false;

        if (cliArgListItem[0] == '-')
        {
            isOption = true;
        }

        switch(index)
        {
            case 0:
                if(!isOption) {
                    if(validName(cliArgListItem)) {
                        argsArr[index] = cliArgListItem;
                        readStatus = RFG_STATUS.OK
                        break;
                    } else {
                        return createStatusPayload(RFG_STATUS.FEATURE_NAMING_ERROR, "Naming Error: The feature name must be valid for a variable in your code")
                    }
                }
            case 1:
                if(!isOption) {
                    if(existsSync(path.join(cliArgListItem))) {
                        argsArr[index] = cliArgListItem;
                        readStatus = RFG_STATUS.OK
                        break;
                    } else {
                        return createStatusPayload(RFG_STATUS.FOLDER_NOT_FOUND_ERROR, "Folder Path Error: The folder must exist to generate the features")
                    }
                }
            default:
                if(isOption){
                    switch(cliArgListItem){
                        case "-h":
                        case "--help":
                            return createStatusPayload(RFG_STATUS.HELP);
                        case "-v":
                        case "--version":
                            return createStatusPayload(RFG_STATUS.VERSION);
                        case "-t":
                        case "--template":
                            if(templateTypesArr.includes(argv[++index])){
                                argsArr[1] = argv[index];
                            } else {
                                return createStatusPayload(RFG_STATUS.ERROR, `Argument Error: Invalid template pattern attempted please provide one of the options seen here [${templateTypesArr}]`);
                            }
                            break;
                        default:
                            return createStatusPayload(RFG_STATUS.UNKNOWN_FLAG_ERROR, "Error: Unknown Command Provided")
                    }
                }
                break;
        }
    }
    return {
        status: readStatus,
        argv: argsArr
    };
};

/**
 * TODO
 * @returns 
 */
const generateHelp = () => {
    let helpString = "redux-feature-generator:\t\tA simple command line tool to speed up the time it takes to setup a new redux feature.\n\n";
    helpString = helpString.concat(
        "\tUsage:\t\tgenerate-feature <featureName> [--template redux-typescript]\n\n",
        "\tcustomName\t\t\tThe name of your new feature.\n",
        "\tfeatureFolder\t\t\tThe folder location that you want the files generated in.\n",
        "\t-h --help\t\t\tPrint command help.\n",
        "\t-v --version\t\t\tPrint command help.\n",
        "\t--template <template>\t\tThe template structure you would like use for generation.\n\n"
        );
    return helpString;
};

/**
 * TODO
 * @param cfg 
 * @returns 
 */
const getVer = (cfg: any): string => {
    return `v${cfg.version}`;
};

/**
 * TODO
 * @param status 
 * @param message 
 * @returns 
 */
const createStatusPayload = (status: RFG_STATUS, message?: string): ArgumentPayload => {
    if(message){
        console.log(message);
    }
    return {
        status: status,
        argv: []
    }
}

/**
 * TODO
 */
export const rfgArgs = {
    read: readArgs,
    help: generateHelp,
    version: getVer
};