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

    let index = 0
    
    while( readStatus == RFG_STATUS.NOTSET && argv.length > 0 && argv.length < 4 ) {

        if(index === 0 && NAME_VALIDATOR.test(argv[0]))
        {
            argsArr[0] = argv[index];
        }
        switch(argv[index]){
            case "-h":
            case "--help":
                readStatus = RFG_STATUS.HELP;
                break;
            case "-v":
            case "--version":
                readStatus = RFG_STATUS.VERSION;
                break;
            case "-t":
            case "--template":
                argsArr[1] = argv[index+1];
                break;
            default:
                readStatus = RFG_STATUS.ERROR;
        }

        index++
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
        "\t-h --help\t\t\tPrint command help.\n",
        "\t-v --version\t\t\tPrint command help.\n",
        "\tcustomeName\t\t\tThe name of your new feature.\n",
        "\toutPath\t\t\t\tThe path that the generated files will be placed.\n",
        "\t--template <template>\t\tThe template structure you would like use for generation.\n\n"
        );
    return helpString;
};

const getVer = (cfg: any): string => {
    return `v${cfg.version}`;
};

export const rfgArgs = {
    read: readArgs,
    help: generateHelp,
    version: getVer
};