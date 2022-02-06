import { isArgumentsObject } from "util/types";

/**
 * A file is the handler for the argument array of the commmand line
 */
const GeneratorLanguages = ["JAVASCRIPT", "TYPESCRIPT"];
const GeneratorFrames = ["REDUX", "REACT"];
const NameRegExp = /^([A-Z][1-9][\-])*/
declare type GeneratorConfig = {
    lang: string,
    frame: string,
    name: string
}

const GeneratorConfig: GeneratorConfig = {
    lang: "",
    frame: "",
    name: ""
}

export const handleGeneratorArguments = (args: any) => {

    try {
        GeneratorConfig.lang = args.template?.split("-")[1].toUpperCase();
        GeneratorConfig.frame = args.template?.split("-")[0].toUpperCase();
        GeneratorConfig.name = (args._)[0];
    } catch (err: any) {
        return err;
    };

    if( GeneratorLanguages.includes(GeneratorConfig.lang) 
        && GeneratorFrames.includes(GeneratorConfig.frame)
        && NameRegExp.test(GeneratorConfig.name)
    ){
        console.log("Hello World");
    } else {
        return SyntaxError;
    }

};