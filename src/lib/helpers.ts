/**
 * TODO
 * @param name 
 * @returns 
 */
export const capitalize = (name: string): string => {
    if(name.length > 0) {
        return name[0].toUpperCase() + name.substring(1);
    }
    return "";
}

/**
 * TODO
 * @param name 
 * @returns 
 */
export const lowercase = (name: string): string => {
    if(name.length > 0) {
        return name[0].toLowerCase() + name.substring(1);
    }
    return "";
}

/**
 * TODO
 * @param str 
 * @param find 
 * @param replace 
 * @returns 
 */
export const replaceAll = (str: string, find: string, replace: string): string => {
    var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, 'g'), replace);
}

/**
 * TODO
 * @param featureName 
 * @returns 
 */
export const validName = (featureName: string): boolean => {

    return /^[a-zA-Z0-9]*$/.test(featureName);
}