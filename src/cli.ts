#!/usr/bin/env node
import { ARG_PARSER_STATUS, ArgParser } from "./lib/ArgParser";
import { generateContextHelp } from "./lib/helpers"

// Delete the 0 and 1 argument (node and script.js)
ArgParser(process.argv.splice(process.execArgv.length + 2))
.then(parserStatus => {
    /**
     * Handle Parser Status
     */
    switch(parserStatus) {
        case ARG_PARSER_STATUS.SUCCESS:
            process.stdout.write("Arguments Parsed Successfully");
            break;
        case ARG_PARSER_STATUS.ARGERROR:
            process.stdout.write("Incorrect Number of Argument Error: ");
            process.stdout.write(generateContextHelp());
            break;
        case ARG_PARSER_STATUS.FAILURE:
            process.stdout.write("Processing Error: ");
            process.stdout.write(generateContextHelp());
            break;
        case ARG_PARSER_STATUS.HELP:
            process.stdout.write(generateContextHelp());
            break;
        default:
            process.stdout.write("UNKNOWN ERROR OCCURED");
            break;
    }
    process.exit(0)
});