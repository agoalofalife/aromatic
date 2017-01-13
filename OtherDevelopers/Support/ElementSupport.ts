

function copyElement(element : any){
    if ( element instanceof Array ) {
        return element.slice();
    }
}

export {copyElement}