import Element from  './Element';
import ITypeElement from '../Interfaces/ITypeElement';
import {copyElement} from '../Support/ElementSupport';



class EachElement extends Element implements ITypeElement{
    regexPutMustache : string = '{{#each ([A-z]{1,})}}';

    transform() : string{
        let EachName  : string   = this.getOriginalString().match(this.regexPutMustache)[1];
        // console.log( this.Parser );
        if ( this.Data.getStartData()[EachName] !== undefined ) {

            // to freeze the counter
            this.Parser.setFreezeCounter(this.Parser.getCurrentCounter() - 1);


            if ( this.Parser.getEachData() === undefined ) {
                //set the data to parse the template {{each}}
                this.Parser.setEachData( copyElement(this.Data.getStartData()[EachName]) );
            }

            // set the current set to work in a loop
            this.Parser.setCurrentDataEach( this.Parser.getEachData().shift() );

            this.Parser.setLastLabelData( EachName );
            this.Parser.setToggleEach( true );
        } else {
            this.Parser.setToogle( false );
        }
        return '';
    }


}
export default EachElement
