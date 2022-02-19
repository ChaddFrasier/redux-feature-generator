import * as fs from 'fs';

export enum GEN_STATUS {
    SUCCESS=0,
    FAILURE
}
export declare type GeneratorConfig = {
    lang: string,
    frame: string,
    name: string,
    projectPath: string
}
export const dispatchGenerator = (config: GeneratorConfig): GEN_STATUS => {
    let files: string[] = ["Counter.module.css"];
    if(fs.existsSync("templates/counter/Counter.module.css.ftl")) {
        const fileBuffer: string = fs.readFileSync("templates/counter/Counter.module.css.ftl", {encoding: "utf-8"});
    
        files.forEach(fileName => {
            console.log("HERE")
            fs.mkdirSync(config.projectPath)
            fs.copyFile("templates/counter/Counter.module.css.ftl",`${config.projectPath}/${fileName}`, ()=> {
                console.log("FINISHED")
            });
        });
    }
   

    return GEN_STATUS.SUCCESS;
}