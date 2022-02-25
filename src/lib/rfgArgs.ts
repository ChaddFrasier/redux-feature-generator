export enum RFG_STATUS {
    GO=1,
    HELP,
    VERSION,
    ERROR,
    NOTSET
};
export declare type ArgumentPayload = {
    status: RFG_STATUS,
    argv: string[]
};

const NAME_VALIDATOR = /^[^*|\":<>[\]{}`\\()0-9\-';@&$]+$/;
const readArgs = (argv: string[]): ArgumentPayload => {
    let readStatus: RFG_STATUS = RFG_STATUS.NOTSET;
    const argsArr: string[] = [];

    /**
     * Fail on incorrect length of argv
     */
    if(argv.length === 0 || argv.length >= 4) {
        readStatus = RFG_STATUS.ERROR
        return createStatusPayload(readStatus)
    }
    
    for (let index = 0; index < argv.length; index++) {
        const element = argv[index];

        if(index === 0 && NAME_VALIDATOR.test(element))
        {
            argsArr[index] = element;
            readStatus = RFG_STATUS.GO
            continue;
        }
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
            case "-z":
                readStatus = RFG_STATUS.ERROR;
                return createStatusPayload(readStatus);
        }
    }

    return {
        status: readStatus,
        argv: ["hellow"]
    };
};

const generateHelp = () => {
    let helpString = "redux-feature-generator:\t\tA simple command line tool to speed up the time it takes to setup a new redux feature.\n\n";
    helpString = helpString.concat(
        "\tUsage:\t\tgenerate-feature <featureName> [--template redux-typescript]\n\n",
        "\tcustomeName\t\t\tThe name of your new feature.\n",
        "\t-h --help\t\t\tPrint command help.\n",
        "\t-v --version\t\t\tPrint command help.\n",
        //"\toutPath\t\t\t\tThe path that the generated files will be placed.\n",
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