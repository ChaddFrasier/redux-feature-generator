/**
 * @file rfgArgs.ts
 * @version 1.4.0
 * @fileoverview Redux Feature Generator (RFG) Argument Processor is used to process and verify any cli user input and return a command status.
 */
import { existsSync } from 'fs'
import { join } from 'path';
import { validName } from './helpers';

/**
 * Simple status enumeration of the all feature generator commands
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
 * Argument Payload used to group cli command data
 */
export declare type ArgumentPayload = {
    status: RFG_STATUS,
    argv: string[]
};

/**
 * Self explanatory
 */
const MAX_ARGUMENT_LIMIT = 4

/**
 * Main cli argument handler
 * @param argv list of args from the cli
 * @returns ArgumentPayload
 */
const readArgs = (argv: string[]): ArgumentPayload => {
    // Keep track of the status
    let commandPayload: ArgumentPayload = {
        status: RFG_STATUS.UNKNOWN_ERROR,
        argv: []
    }
    
    // Types of templates allowed
    const templateTypesArr = [
        "redux-typescript",
        "redux-javascript"
    ];
    
    /**
     * Fail on incorrect length of argv
     */
    if(argv.length === 0 || argv.length > MAX_ARGUMENT_LIMIT) { 
        return createStatusPayload(RFG_STATUS.ERROR, "Error: Incorrect Amount of Arguments")
    }
    
    /**
     * For each argument given on cli
     */
    for ( let index = 0; index < argv.length; index++ )
    {
        const cliArgListItem = argv[index];
        let isOption = false;

        if (cliArgListItem[0] == '-')
        {
            isOption = true;
        }

        switch(index)
        {
            case 0: // Check that first argument is a valid name
                if(!isOption) {
                    if(validName(cliArgListItem)) {
                        commandPayload.argv[index] = cliArgListItem;
                        commandPayload.status = RFG_STATUS.OK
                        break;
                    } else {
                        return createStatusPayload(RFG_STATUS.FEATURE_NAMING_ERROR, "Naming Error: The feature name must be valid for a variable in your code")
                    }
                } // else Pass and handle in default
            case 1: // Check that second argument is a valid path
                if(!isOption) {
                    if(existsSync(join(cliArgListItem))) {
                        commandPayload.argv[index] = cliArgListItem;
                        commandPayload.status = RFG_STATUS.OK
                        break;
                    } else {
                        return createStatusPayload(RFG_STATUS.FOLDER_NOT_FOUND_ERROR, "Folder Path Error: The folder must exist to generate the features")
                    }
                }  // else Pass and handle in default
            default:
                if(isOption){ // Handle arguments or unknown cases
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
                                commandPayload.argv[1] = argv[index];
                            } else {
                                return createStatusPayload(RFG_STATUS.ERROR, `Argument Error: Invalid template pattern attempted please provide one of the options seen here [${templateTypesArr}]`);
                            }
                            break;
                        default:
                            return createStatusPayload(RFG_STATUS.UNKNOWN_FLAG_ERROR, "Error: Unknown Command Provided")
                    }
                } else {
                    return createStatusPayload(RFG_STATUS.UNKNOWN_ERROR, "Error: Unknown Command Provided")
                }
                break;
        }
    }
    return commandPayload;
};

/**
 * Builds and returns help text
 * @returns {string} The help text that should be printed to console
 */
const generateHelp = (): string => {
    let helpString = "redux-feature-generator:\t\tA simple command line tool to speed up the time it takes to setup a new redux feature.\n\n";
    helpString = helpString.concat(
        "\tUsage:\tgenerate-feature <featureName> <generationPath> [--template redux-typescript]\n\n",
        "\tExample:\n",
        "\t\tgenerate-feature <featureName>\n",
        "\t\tgenerate-feature <featureName> <generationPath>\n",
        "\t\tgenerate-feature <featureName> <generationPath> -t <template>\n\n",
        "\tcustomName\t\t\tThe name of your new feature.\n",
        "\tfeatureFolder\t\t\tThe folder location that you want the files generated in.\n",
        "\t-h --help\t\t\tPrint command help.\n",
        "\t-v --version\t\t\tPrint command help.\n",
        "\t--template <template>\t\tThe template structure you would like use for generation.\n\n"
        );
    return helpString;
};

/**
 * Retrieve the version string from the config file
 * @param cfg 
 * @returns 
 */
const getVersion = (cfg: any): string | undefined => {
    if(cfg !== undefined && cfg.version !== undefined){
        const rfgVersion = `v${cfg.version}`;
        return rfgVersion
    }
};

/**
 * Create the payload to return to the cli functions
 * @param status {RFG_STATUS} the status of the command
 * @param message {string | undefined} if a message must be printed, include it here
 * @returns ArgumentPayload
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
 * API
 */
export const rfgApi = {
    processCommand: readArgs,
    getHelp: generateHelp,
    getVersion: getVersion
};