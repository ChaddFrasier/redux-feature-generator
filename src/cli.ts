#!/usr/bin/env node
import { ARG_PARSER_STATUS, ArgParser, generateContextHelp } from "./lib/ArgParser";

// Delete the 0 and 1 argument (node and script.js)
const ArgumentParserStatus: ARG_PARSER_STATUS = ArgParser(process.argv.splice(process.execArgv.length + 2));
switch(ArgumentParserStatus) {
    case ARG_PARSER_STATUS.SUCCESS:
        process.stdout.write("Arguments Parsed Successfully");
        break;
    case ARG_PARSER_STATUS.FAILURE:
        process.stdout.write("Argument Error: ");
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