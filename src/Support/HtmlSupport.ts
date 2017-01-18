import entityMap from '../Maps/EntityMap';

/**
 * Removes all \n in Html and spaces between tags
 * @param text
 * @returns {string}
 */
function normalizeText(text : string) : string {
    text           =  text.replace(/\n/g, '');

    let regex      =  text.match(/>(\s+)</);
    if ( regex !== null) {
        let regexSpace = `${text.match(/>(\s+)</)[1]}`;
        text           =  text.replace( new RegExp(regexSpace, 'g'), '');
    }

    return text;
}

/**
 * converts values
 * @param html
 * @returns {string}
 */
function escapeHtml(html : string) : string{
    return String(html).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
        return entityMap[s];
    });
}

export  {normalizeText,escapeHtml};