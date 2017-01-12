/**
 * Removes all \n in Html and spaces between tags
 * @param text
 * @returns {string}
 */
function normalizeText(text : string) : string {
    text           =  text.replace(/\n/g, '');
    let regexSpace = `${text.match(/>(\s+)</)[1]}`;
    text           =  text.replace( new RegExp(regexSpace, 'g'), '');
    return text;
}

export  {normalizeText};