import Element from  './Element';
import ITypeElement from '../Interfaces/ITypeElement';


class IfCloseElement extends Element implements ITypeElement{
    transform(){
        this.Parser.setToogle( true );
        return '';
    }
}
export default IfCloseElement;