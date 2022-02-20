export const capitalize = (string: string): string => {
    return string[0].toUpperCase() + string.substring(1)
}

export const lowercase = (string: string): string => {
    return string[0].toLowerCase() + string.substring(1)
}

export const replaceAll = (str: string, find: string, replace: string): string => {
    var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, 'g'), replace);
}

export const generateContextHelp = () => {
    let helpString = "";
    helpString = "redux-feature-generator:\t\tA simple command line tool to speed up the time it takes to setup a new redux feature.\n\n";
    helpString = helpString.concat(
        "\t-h --help\t\t\t\tPrint command help.\n",
        "\tcustomeName\t\t\t\tThe name of your new feature.\n",
        "\toutPath\t\t\t\t\tThe path that the generated files will be placed.\n",
        "\t--template <template>\t\tThe template structure you would like use for generation.\n\n"
        );
    return helpString;
}