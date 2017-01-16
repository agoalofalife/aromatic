

// the function extracts the parameters from the function toString
function extractFunctionParameters(func) {
    let  STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
    let ARGUMENT_NAMES  = /([^\s,]+)/g;
    let fnStr           = func.toString().replace(STRIP_COMMENTS, '');
    let result          = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);

    if(result === null)
        result = [];
    return result;
}

export  {extractFunctionParameters}