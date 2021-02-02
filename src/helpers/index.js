export const boldString = (str, substr) => {
    let regExp = new RegExp(substr, 'g');
    return {__html: str.replace(regExp, `<b>${substr}</b>`)};
}

export const capitalizeString = (str) => {
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}
