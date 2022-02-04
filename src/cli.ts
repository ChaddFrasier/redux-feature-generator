#!/usr/bin/env node
import yargs = require("yargs");
import {generator} from "./generator";

const yargs_obj =  yargs
  .usage("Usage: <componentName> -t <template>")
  .positional("n", { alias: "componentName", describe: "Name of the component you want to generate", type: "string", demandOption: true })
  .option("t",{ alias: "template", describe: "The generation template to follow", type: "string", demandOption: true })
  .argv;

  try{
    const options = {
      componentName: yargs_obj['_'],
      template: yargs_obj["template"]
    };
    const generatorObj = new generator(options);
    // run the generator class
    console.log(generatorObj.getAPI().test())
  }catch(e){
    console.log(e);
  }