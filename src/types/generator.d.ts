export type CommandOptions = {
    config: ConfigTypes;
    language: GeneratorLanguages;
    featureFolder?: string | undefined;
};
export type ConfigTypes = "react" | "redux" | "react-typescript" | "redux-typescript";