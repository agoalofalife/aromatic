import Element from  './Element';
import ITypeElement from '../Interfaces/ITypeElement';


class EachElementClose extends Element implements ITypeElement{
    regexPutMustache : string = '{{#if ([A-z]{1,})}}';

    transform(){

        if ( this.Parser.getEachData().length > 0 ) {
            this.Parser.setCurrentCounter(this.Parser.getFreezeCounter());
        }


        this.Parser.setToggleEach( false );
        return '';
    }

}
export default EachElementClose
