import Element from  './Element';
import ITypeElement from '../Interfaces/ITypeElement';


class EachElementClose extends Element implements ITypeElement{
    regexPutMustache : string = '{{#if ([A-z]{1,})}}';

    transform(){
        this.Parser.setToggleEach( false );
        return '';
    }

}
export default EachElementClose
