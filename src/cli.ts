#!/usr/bin/env node
import { handleGeneratorArguments } from "./lib/generator-arguments";
import { GEN_STATUS } from "./lib/generator";
const argv = require('minimist')(process.argv.slice(2));
handleGeneratorArguments(argv).then( status => {
    switch(status) {
        case GEN_STATUS.SUCCESS:
            console.log("Generation Finished Successfully");
            break;
        case GEN_STATUS.FAILURE:
            console.log("Usage:     generate-feature <customName> --template <framework>-<langauge>");
            break;
        default:
            console.log("SYNC FAILURE")
    }
});