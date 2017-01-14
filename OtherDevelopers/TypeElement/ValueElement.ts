import Element from  './Element';
import ITypeElement from '../Interfaces/ITypeElement';
import {escapeHtml} from '../Support/HtmlSupport';


class ValueElement extends Element implements ITypeElement{
    regexPutMustache  : string  = '[A-z]{1,}\.?[A-z]{1,}';

    public transform() : string{
        let valueInBrackets  : string      =  this.getOriginalString().match(this.regexPutMustache).shift();

        let attachedProperties  : string[] =  valueInBrackets.split('.');
        let endResult           : any;


        if ( this.Parser.getToggle() === true && attachedProperties !== undefined && this.Parser.getToggleEach() === false) {

            // this is for objects with their properties example object.property
            if ( attachedProperties.length > 1 ) {
                let buidDeepObject = this.Data.getStartData();

                attachedProperties.forEach( property => {
                    endResult = endResult ? endResult[property] : buidDeepObject[property];
                });
            } else {
                endResult = this.Data.getStartData()[attachedProperties.shift()];
            }

            return escapeHtml(endResult) ;
        }

        if ( this.Parser.getToggleEach() === true && this.Parser.getToggle() === true) {
            let valueForInsert : string;
            if ( attachedProperties.length > 1 ) {
                let buidDeepObject = this.Parser.getСurrentDataEach();

                attachedProperties.forEach( property => {
                    valueForInsert = valueForInsert ? valueForInsert[property] : buidDeepObject[property];
                });

            } else {
                valueForInsert = this.Parser.getСurrentDataEach()[attachedProperties.shift()];
            }

            return escapeHtml(valueForInsert || '');
        }
        return '';
    }
}
export default ValueElement;