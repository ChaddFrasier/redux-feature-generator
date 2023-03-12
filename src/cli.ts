#!/usr/bin/env node
/**
 * @file cli.ts
 * @version 1.4.0
 * @fileoverview Main file for handling the commands
 */
import { generateFiles } from './lib/rfg';
import { rfgApi, RFG_STATUS } from './lib/rfgArgs';

// Read Arguments from the user
const rfgCommandObj = rfgApi.processCommand(process.argv.splice(process.execArgv.length + 2));

// Handle the status of the read attempt
switch(rfgCommandObj.status) {
    case RFG_STATUS.HELP:
        console.log(rfgApi.getHelp());
        process.exit(0);
    case RFG_STATUS.VERSION:
        console.log(rfgApi.getVersion(require("../../package.json")));
        process.exit(0);
    case RFG_STATUS.ERROR:
        console.log(`\n${rfgApi.getHelp()}\n\n`);
        process.exit(2);
    case RFG_STATUS.OK:
        const cmdStatus = generateFiles((rfgCommandObj.argv));
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
        process.exit(rfgCommandObj.status);
}