import Element from  './Element';
import ITypeElement from '../Interfaces/ITypeElement';
import {escapeHtml} from '../Support/HtmlSupport';



class ValueElement extends Element implements ITypeElement{

    public transform(){
        let valueInBrackets      =  this.getOriginalString().match('[A-z]{1,}\.?[A-z]{1,}').shift();
        let attachedProperties   =  valueInBrackets.split('.');
        let endResult : any;

        if ( this.toggle === true && attachedProperties !== undefined) {

            if ( attachedProperties.length > 1 ) {
                let buidDeepObject = this.Data.getStartData();

                attachedProperties.forEach( property => {
                    endResult = endResult ? endResult[property] : buidDeepObject[property];
                });
            } else {
                endResult = this.Data.getStartData()[attachedProperties.shift()];
            }
        }

        return escapeHtml(endResult);
    }

}
export default ValueElement;