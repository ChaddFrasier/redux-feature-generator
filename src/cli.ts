#!/usr/bin/env node
import { handleGeneratorArguments } from "./lib/arguments";
var argv = require('minimist')(process.argv.slice(2));
console.log(handleGeneratorArguments(argv));