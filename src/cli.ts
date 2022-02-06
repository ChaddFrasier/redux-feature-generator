#!/usr/bin/env node
import { handleGeneratorArguments } from "./lib/generator-arguments";
import { GEN_STATUS } from "./lib/generator";
const argv = require('minimist')(process.argv.slice(2));
const status: GEN_STATUS = handleGeneratorArguments(argv);
switch(status) {
    case GEN_STATUS.SUCCESS:
        // TODO: Print out information for the user
        break;
    case GEN_STATUS.FAILURE:
        console.log("Usage:     generate-feature <customName> --template <framework>-<langauge>");
        break;
}