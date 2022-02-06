#!/usr/bin/env node
import { handleGeneratorArguments } from "./lib/arguments";
const argv = require('minimist')(process.argv.slice(2));
/* TODO: Handle a success and an error runs
    Success => Display the file paths in console that were written
    Failure => Print the message that corresponds to the error code
*/
const status = handleGeneratorArguments(argv);

switch(status) {
    case SyntaxError:
        // Users input was incorrectly formatted
        console.log("Usage:     generate-feature <customName> --template <framework>-<langauge>");
}