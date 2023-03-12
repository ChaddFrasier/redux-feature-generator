#!/usr/bin/env node
/**
 * @file cli.ts
 * @version 1.4.0
 * @fileoverview Main file for handling the commands from the user
 */
import { dispatch } from './lib/rfg';
import { rfgArgs, RFG_STATUS } from './lib/rfgArgs';

// Read Arguments from the user
const args = rfgArgs.read(process.argv.splice(process.execArgv.length + 2));

// Handle the status of the read attempt
switch(args.status) {
    case RFG_STATUS.HELP:
        console.log(rfgArgs.help());
        process.exit(0);
    case RFG_STATUS.VERSION:
        console.log(rfgArgs.version(require("../../package.json")));
        process.exit(0);
    case RFG_STATUS.ERROR:
        console.log(`\n${rfgArgs.help()}\n\n`);
        process.exit(2);
    case RFG_STATUS.OK:
        const cmdStatus = dispatch((args.argv));
        switch(cmdStatus){
            case RFG_STATUS.OK: 
                console.log(`Exit Status ${cmdStatus}\n\n`)
                break;
            case RFG_STATUS.ERROR: 
                console.log(`Exit Status ${cmdStatus}\n\n`)
                break;
            case RFG_STATUS.FOLDER_NOT_FOUND_ERROR: 
                console.log(`Exit Status ${cmdStatus}\nCould not find target folder for generation\n\n`)
                break;
            }
        process.exit(cmdStatus);
    default:
        process.exit(args.status);
}