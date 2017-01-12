import Element from  './Element';
import ITypeElement from '../Interfaces/ITypeElement';


class EachElement extends Element implements ITypeElement{
    regexPutMustache : string = '{{#each ([A-z]{1,})}}';

    transform(){
        let EachName           = this.getOriginalString().match(this.regexPutMustache)[1];

        this.Parser.setLastLabelData( EachName );
        this.Parser.setToggleEach( true );
        return '';
    }

}
export default EachElement
