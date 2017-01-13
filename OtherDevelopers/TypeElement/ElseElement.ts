import Element from  './Element';
import ITypeElement from '../Interfaces/ITypeElement';


class ElseElement extends Element implements ITypeElement{

    transform(){

        if ( this.Parser.getToggle() === true ) {
            this.Parser.setToogle( false );
        }
        return '';
    }

}
export default ElseElement;