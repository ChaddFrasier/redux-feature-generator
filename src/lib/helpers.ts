export const capitalize = (name: string): string => {
    if(name.length > 0) {
        return name[0].toUpperCase() + name.substring(1);
    }
    return "";
}

export const lowercase = (name: string): string => {
    if(name.length > 0) {
        return name[0].toLowerCase() + name.substring(1);
    }
    return "";
}

export const replaceAll = (str: string, find: string, replace: string): string => {
    var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, 'g'), replace);
}