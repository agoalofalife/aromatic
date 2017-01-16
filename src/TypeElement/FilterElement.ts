import Element                     from  './Element';
import ITypeElement                from '../Interfaces/ITypeElement';
import Aromatic                    from '../Aromatic';
import {isNotUndefined}            from '../Support/IsType';


/**
 * @description                     Class for custom functions transforming values
 * @property    regexPutMustache    Regular expression to extract
 * @method      transform           the basic method for all types  Element
 */
class FilterElement extends Element implements ITypeElement{
    private regexPutMustache  : string  = '{{([A-z]+\\.?[A-z]+)\\s*\\|\\s*([A-z]+)}}';

    public transform() : string{

            let NameFilterFunction                    =    this.getOriginalString().match(this.regexPutMustache)[2];
            let valueInBrackets     : string          =    this.getOriginalString().match(this.regexPutMustache)[1];

            // get custom function
            let filterFunction                        =    Aromatic.getFilter( NameFilterFunction );
            let attachedProperties  : string[]        =    valueInBrackets.split('.');
            let endResult           : any;

            if ( this.Parser.getToggle() === true && isNotUndefined(attachedProperties) && this.Parser.getToggleEach() === false && isNotUndefined(filterFunction) ) {

                // this is for objects with their properties example object.property
                if ( attachedProperties.length > 1 ) {
                    let buidDeepObject = this.Data.getStartData();

                    attachedProperties.forEach( property => {
                        endResult = endResult ? endResult[property] : buidDeepObject[property];
                    });
                    if ( isNotUndefined( endResult ) ) {
                        endResult =  filterFunction( endResult );
                    }
                } else {
                    let parameterFunction =  this.Data.getStartData()[valueInBrackets];

                    if ( isNotUndefined( parameterFunction ) ) {
                        endResult =  filterFunction( parameterFunction );
                    }
                }

                return endResult;
            }

            if ( this.Parser.getToggleEach() === true && this.Parser.getToggle() === true && isNotUndefined(filterFunction)) {

                let valueForInsert : string;
                if ( attachedProperties.length > 1 ) {

                    let buidDeepObject =  this.Parser.getСurrentDataEach();

                    attachedProperties.forEach( property => {
                        endResult = endResult ? endResult[property] : buidDeepObject[property];
                    });

                    if ( isNotUndefined( endResult ) ) {
                        endResult =  filterFunction( endResult );
                    }
                    return endResult || '';
                } else {
                    let parameterFunction = this.Parser.getСurrentDataEach()[valueInBrackets];
                    if ( isNotUndefined( parameterFunction ) ) {
                        valueForInsert =  filterFunction( this.Parser.getСurrentDataEach()[valueInBrackets] );
                    }
                }
                return valueForInsert || '';
            }
            return '';
        }
}
export default FilterElement;