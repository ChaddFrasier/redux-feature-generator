import * as fs from 'fs'
import path from 'path';
import { PassThrough } from 'stream';
export enum RFG_STATUS {
    GO=0,
    VERSION,
    HELP,
    ERROR=400,
    NOTSETERROR,
    UNKNOWNFLAGERROR,
    FOLDERNOTFOUND,
    
};
export declare type ArgumentPayload = {
    status: RFG_STATUS,
    argv: string[]
};

const ARGUMENT_LIMIT = 4

const readArgs = (argv: string[]): ArgumentPayload => {
    let readStatus: RFG_STATUS = RFG_STATUS.NOTSETERROR;
    const argsArr: string[] = [];

    /**
     * Fail on incorrect length of argv
     */
    if(argv.length === 0 || argv.length > ARGUMENT_LIMIT) { 
        return createStatusPayload(RFG_STATUS.ERROR)
    }
    
    for (let index = 0; index < argv.length; index++) {
        const element = argv[index];
        let isOption = false;

        if(element[0] == '-') {
            isOption = true;
        }

        if(index === 0 && !isOption && /^[^*|\":<>[\]{}`\\()0-9\-';@&$]+$/.test(element))
        {
            argsArr[index] = element;
            readStatus = RFG_STATUS.GO
            continue;
        } else if(index === 1 && !isOption) {
            if(fs.existsSync(path.join(element))) {
                argsArr[index] = element;
                readStatus = RFG_STATUS.GO
                continue;
            } else {
                return createStatusPayload(RFG_STATUS.FOLDERNOTFOUND)
            }
            
        } else if (isOption) {
            switch(element){
                case "-h":
                case "--help":
                    readStatus = RFG_STATUS.HELP;
                    return createStatusPayload(readStatus);
                case "-v":
                case "--version":
                    readStatus = RFG_STATUS.VERSION;
                    return createStatusPayload(readStatus);
                case "-t":
                case "--template":
                    if(["redux-typescript", "redux-javascript"].includes(argv[++index])){
                        argsArr[1] = argv[index];
                    } else {
                        return createStatusPayload(RFG_STATUS.ERROR);
                    }
                    break;
                default:
                    return createStatusPayload(RFG_STATUS.UNKNOWNFLAGERROR)
            }
        }
    }
    return {
        status: readStatus,
        argv: argsArr
    };
};

const generateHelp = () => {
    let helpString = "redux-feature-generator:\t\tA simple command line tool to speed up the time it takes to setup a new redux feature.\n\n";
    helpString = helpString.concat(
        "\tUsage:\t\tgenerate-feature <featureName> [--template redux-typescript]\n\n",
        "\tcustomeName\t\t\tThe name of your new feature.\n",
        "\tfeatureFolder\t\t\tThe folder location that you want the files generated in.\n",
        "\t-h --help\t\t\tPrint command help.\n",
        "\t-v --version\t\t\tPrint command help.\n",
        "\t--template <template>\t\tThe template structure you would like use for generation.\n\n"
        );
    return helpString;
};

const getVer = (cfg: any): string => {
    return `v${cfg.version}`;
};

const createStatusPayload = (status: RFG_STATUS): ArgumentPayload => {
    return {
        status: status,
        argv: []
    }
}

export const rfgArgs = {
    read: readArgs,
    help: generateHelp,
    version: getVer
};