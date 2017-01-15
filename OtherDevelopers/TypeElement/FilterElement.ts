import Element                   from  './Element';
import ITypeElement              from '../Interfaces/ITypeElement';
import Aromatic                  from '../Aromatic';
import {extractFunctionParameters} from '../Support/FunctionSupport';


class FilterElement extends Element implements ITypeElement{
    regexPutMustache  : string  = '{{([A-z]+)\\s*\\|\\s*([A-z]+)}}';

    public transform() : string{

            let filterFunction                    =    this.getOriginalString().match(this.regexPutMustache)[2];
            let valueInBrackets     : string      =    this.getOriginalString().match(this.regexPutMustache)[1];

            let temp = Aromatic.getFilter(filterFunction);


            console.log(extractFunctionParameters(temp) );
        // console.log( Function.prototype.call() );

            let attachedProperties  : string[]    =    valueInBrackets.split('.');
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

                return endResult ;
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

                return valueForInsert || '';
            }
            return '';
        }


}
export default FilterElement;