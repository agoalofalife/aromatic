import Parser from '../Parser';

abstract class Element {
    originalString : string;
    Parser         : Parser;

    constructor(string : string, Parser : Parser){
        this.originalString = string;
        this.Parser         = Parser;
    }

}
export default Element;