import TypeTemplate from '../Enums/TypeTemplate';
import Template from './Template';

class BaseTemplate extends Template{
    private templateBrackets   : string[] = ['{{', '}}'];
    private outString : string;

    public processing(string : string, type : TypeTemplate) : any{

        let positionStartBrackets   = string.search(this.templateBrackets[type]);

        if (positionStartBrackets === -1 ) {
            return null;
        }
        if (type === 1) {
            positionStartBrackets = positionStartBrackets + 2;
        }
        let partString              = string.substr( 0, positionStartBrackets );
        this.outString              = string.substr( positionStartBrackets );

        return partString;
    }
    public getRestString() : string{
        return this.outString;
    }
}

export default BaseTemplate;