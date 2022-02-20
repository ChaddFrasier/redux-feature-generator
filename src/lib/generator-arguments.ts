import {dispatchGenerator, GEN_STATUS, GeneratorConfig} from "./generator";

const GeneratorLanguages = ["JAVASCRIPT", "TYPESCRIPT"];
const GeneratorFrames = ["REDUX", "REACT"];
const NameRegExp = /^([A-Z][1-9][\-])*/;
export const handleGeneratorArguments = (args: any): Promise<GEN_STATUS> => {
    return new Promise((resolve) => {
        const GeneratorConfig: GeneratorConfig = {
            lang: "typescript",
            frame: "redux",
            name: "customName",
            Cname: "CustomName",
            projectPath: `../../../test/src/features/template`
        }
        try {
            GeneratorConfig.lang = args.template?.split("-")[1].toUpperCase();
            GeneratorConfig.frame = args.template?.split("-")[0].toUpperCase();
            GeneratorConfig.name = (args._)[0];
        } catch (err: any) {
            resolve(err);
        };

        console.log("Arguments Formatted Correctly\n" + JSON.stringify(GeneratorConfig));
    
        if( GeneratorLanguages.includes(GeneratorConfig.lang) 
            && GeneratorFrames.includes(GeneratorConfig.frame)
            && NameRegExp.test(GeneratorConfig.name)
        ){
            console.log("Arguments Accepted");
            dispatchGenerator(GeneratorConfig).then( status => {
                resolve(status);
            });
        } else {
            resolve(GEN_STATUS.FAILURE);
        }
    });
};