import Parser from '../Parser';
import Data from '../Data';


abstract class Element {
    private originalString     : string;
    protected toggle           : boolean = true;
    Parser                     : Parser;
    Data                       : Data;


    constructor(string : string, Parser : Parser, Data : Data){
        this.originalString = string;
        this.Parser         = Parser;
        this.Data           = Data;
    }

    public getOriginalString() : string{
        return this.originalString;
    }
}
export default Element;