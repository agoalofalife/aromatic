import Element from  './Element';
import ITypeElement from '../Interfaces/ITypeElement';


class TextElement extends Element implements ITypeElement{
    transform(){
        return this.getOriginalString();
    }
}
export default TextElement;