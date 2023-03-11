#!/usr/bin/env node
import { dispatch } from './lib/rfg';
import { rfgArgs, RFG_STATUS } from './lib/rfgArgs';

const args = rfgArgs.read(process.argv.splice(process.execArgv.length + 2));

switch(args.status) {
    case RFG_STATUS.HELP:
        console.log(rfgArgs.help());
        process.exit(0);
    case RFG_STATUS.VERSION:
        console.log(rfgArgs.version(require("../../package.json")));
        process.exit(0);
    case RFG_STATUS.ERROR:
        console.log(`\n${rfgArgs.help()}`);
        process.exit(2);
    case RFG_STATUS.GO:
        switch(dispatch((args.argv))){
            case RFG_STATUS.GO: 
                console.log(`Exit Status ${RFG_STATUS.GO}`)
                break;
            case RFG_STATUS.ERROR: 
                console.log(`Exit Status ${RFG_STATUS.ERROR}`)
                break;
            case RFG_STATUS.FOLDERNOTFOUND: 
                console.log(`Exit Status ${RFG_STATUS.ERROR}\nCould not find target folder for generation`)
                break;
            }
        process.exit(0);
    default:
        process.exit(1);
}