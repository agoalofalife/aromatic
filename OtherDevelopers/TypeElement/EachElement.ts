import Element from  './Element';
import ITypeElement from '../Interfaces/ITypeElement';


class EachElement extends Element implements ITypeElement{
    regexPutMustache : string = '{{#each ([A-z]{1,})}}';

    transform(){
        let EachName           = this.getOriginalString().match(this.regexPutMustache)[1];

        // to freeze the counter
        this.Parser.setFreezeCounter(this.Parser.getCurrentCounter());

        //for the purpose of the data set for the cycle
        this.Parser.setEachData( this.Data.getStartData()[EachName] );

        // set the current set to work in a loop
        this.Parser.setCurrentDataEach(this.Parser.getEachData().shift());

        this.Parser.setLastLabelData( EachName ); // <= TODO not sure I need it
        this.Parser.setToggleEach( true );
        return '';
    }

}
export default EachElement
