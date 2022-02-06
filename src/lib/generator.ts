export enum GEN_STATUS {
    SUCCESS=0,
    FAILURE
}
export declare type GeneratorConfig = {
    lang: string,
    frame: string,
    name: string
}
export const dispatchGenerator = (config: GeneratorConfig): GEN_STATUS => {
    return GEN_STATUS.SUCCESS;
}