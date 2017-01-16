import Element from  './Element';
import ITypeElement from '../Interfaces/ITypeElement';


class ElseElement extends Element implements ITypeElement{

    transform(){
        this.Parser.setToogle(  !this.Parser.getToggle() );
        return '';
    }

}
export default ElseElement;