import Element from  './Element';
import ITypeElement from '../Interfaces/ITypeElement';


class ElseElement extends Element implements ITypeElement{
    transform(){

        if ( this.Parser.getToggle() === false ) {
            this.Parser.setToggleEach( true );
        }
        return '';
    }

}
export default ElseElement;