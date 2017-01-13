import Element from  './Element';
import ITypeElement from '../Interfaces/ITypeElement';


class TextElement extends Element implements ITypeElement{
    transform(){
        if ( this.Parser.getToggle() === true ) {
            return this.getOriginalString();
        } else {
            return '';
        }

    }
}
export default TextElement;