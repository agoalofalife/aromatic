import Element from  './Element';
import ITypeElement from '../Interfaces/ITypeElement';


class ElseElement extends Element implements ITypeElement{
    transform(){
        if ( this.toggle === false ) {
            this.toggle = true;
        }
        return '';
    }

}
export default ElseElement;