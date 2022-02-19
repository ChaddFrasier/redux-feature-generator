import {dispatchGenerator, GEN_STATUS, GeneratorConfig} from "./generator";

const GeneratorLanguages = ["JAVASCRIPT", "TYPESCRIPT"];
const GeneratorFrames = ["REDUX", "REACT"];
const NameRegExp = /^([A-Z][1-9][\-])*/;
export const handleGeneratorArguments = (args: any) => {
    const GeneratorConfig: GeneratorConfig = {
        lang: "",
        frame: "",
        name: "",
        projectPath: "test/src/feature/counter"
    }
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
        return dispatchGenerator(GeneratorConfig);
    } else {
        return GEN_STATUS.FAILURE;
    }
};