const enum GENERATOR_STATUS {
    OK
}
interface API {
    test:()=>string
}

/**
 * @class generator
 * @classdesc @todo
 */
export class generator {
    private projectDir: string;
    private componentName: string;
    private template: string;
    /**
     * 
     * @param options 
     * @returns 
     */
    constructor(options: {componentName: string, template: string}){
        // default the project folder to the currently running folder
        this.setProjectDir(process.cwd());
        this.setComponentName(options['componentName']);
        this.setTemplate(options['template']);
        return this;
    }
    /**
     * getProjectDir
     * @returns 
     */
    private getProjectDir = (): string => {
        return this.projectDir;
    };
    /**
     * setProjectDir
     * @param path 
     * @returns 
     */
    private setProjectDir = (path: string): GENERATOR_STATUS => {
        this.projectDir = path;
        return GENERATOR_STATUS.OK;
    };
    /**
     * getComponentName
     * @returns 
     */
     private getComponentName = (): string => {
        return this.componentName;
    };
    /**
     * setComponentName
     * @param name 
     * @returns 
     */
    private setComponentName = (name: string): GENERATOR_STATUS => {
        this.componentName = name;
        return GENERATOR_STATUS.OK;
    };
    /**
     * getTemplate
     * @returns 
     */
    private getTemplate = (): string => {
        return this.template;
    };
    /**
     * getTemplate
     * @param template 
     * @returns 
     */
    private setTemplate = (template: string): GENERATOR_STATUS => {
        this.template = template;
        return GENERATOR_STATUS.OK;
    };
    /**
     * API
     * @returns 
     */
    public getAPI = (): API => {
        return {
            test: () => {
                return "HELLO WORLD!";
            }
        };
    }
};