import Element from  './Element';
import ITypeElement from '../Interfaces/ITypeElement';


class IfCloseElement extends Element implements ITypeElement{
    transform(){
        this.toggle = true;
        return '';
    }

}
export default IfCloseElement;