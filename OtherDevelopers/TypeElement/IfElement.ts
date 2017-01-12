import Element from  './Element';
import ITypeElement from '../Interfaces/ITypeElement';


class IfElement extends Element implements ITypeElement{
    regexPutMustache : string = '{{#if ([A-z]{1,})}}';

    transform(){
        let ifName           = this.getOriginalString().match('{{#if ([A-z]{1,})}}')[1];

        if ( this.Data.getStartData()[ifName] !== undefined ) {
            this.toggle = true;
        } else {
            this.toggle = false;
        }

        return '';
    }

}
export default IfElement
