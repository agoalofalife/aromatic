import Element from  './Element';
import ITypeElement from '../Interfaces/ITypeElement';


class ValueEscapeElement extends Element implements ITypeElement{
    transform(){
        return '';
    }
}

export default ValueEscapeElement;