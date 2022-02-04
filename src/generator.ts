/**
 * 
 */
export class generator {
    private projectDir: string;
    private componentName: string;
    private template: string;
    constructor(options: {componentName: string, template: string}){
        // default the project folder to the currently running folder
        this.projectDir = process.cwd();
        this.componentName = options['componentName'];
        this.componentName = options['template'];
        return this;
    }

    private getProjectDir = (): string => {
        return this.projectDir;
    };

    private setProjectDir = (path: string): GENERATOR_STATUS => {
        return GENERATOR_STATUS.OK;
    };

    public test = () => {
        return "HELLO WORLD!";
    }
};

const enum GENERATOR_STATUS {
    OK,
    LOAD,
    FAIL
}