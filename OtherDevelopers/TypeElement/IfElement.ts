import Element from  './Element';
import ITypeElement from '../Interfaces/ITypeElement';


class IfElement extends Element implements ITypeElement{
    regexPutMustache : string = '{{#if ([A-z]{1,})}}';

    transform(){
        if ( this.Parser.getToggle() ) {
            if ( this.Parser.getToggleEach() === false ){
                let ifName           = this.getOriginalString().match(this.regexPutMustache)[1];

                if ( this.Data.getStartData()[ifName] !== undefined ) {
                    this.Parser.setToogle( true );
                } else {
                    this.Parser.setToogle( false );
                }
            }

            if ( this.Parser.getToggleEach() === true ){
                let ifName           =  this.getOriginalString().match(this.regexPutMustache)[1];

                if ( this.Parser.getСurrentDataEach()[ifName]  !== undefined ) {
                    this.Parser.setToogle( true );
                } else {
                    this.Parser.setToogle( false );
                }
            }
        }

        return '';
    }

}
export default IfElement
