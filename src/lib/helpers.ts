/**
 * Capitalize the first letter of a string
 * @param {string} name any string
 * @returns string
 */
export const capitalize = (name: string): string => {
    if(name.length > 0) {
        return name[0].toUpperCase() + name.substring(1);
    }
    return "";
}

/**
 * Lowercase the first letter of a string
 * @param {string} name any string
 * @returns string
 */
export const lowercase = (name: string): string => {
    if(name.length > 0) {
        return name[0].toLowerCase() + name.substring(1);
    }
    return "";
}

/**
 * Replace all instances of a string with another string
 * @param {string} str the string to search within
 * @param {string} find the string the find 
 * @param {string} replace the string the exchange 'find' with 
 * @returns string
 */
export const replaceAll = (str: string, find: string, replace: string): string => {
    var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, 'g'), replace);
}

/**
 * validName
 * @param {string} featureName the name of the feature to check 
 * @returns boolean
 */
export const validName = (featureName: string): boolean => {
    return /^[a-zA-Z0-9]*$/.test(featureName);
}