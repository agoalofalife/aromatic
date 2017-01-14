import TypeTemplate from '../Enums/TypeTemplate';
import Template from './Template';

class EscapeTemplate extends Template{
    private templateBrackets   : string[] = ['{{{', '}}}'];
    private outString : string;

    public processing(string : string, type : TypeTemplate) : any{
        console.log( string ,'EscapeTemplate');
        let positionStartBrackets   = string.search(this.templateBrackets[type]);
        console.log( positionStartBrackets,'positionStartBrackets' );
        if (positionStartBrackets === -1 ) {
            return null;
        }
        if (type === 1) {
            positionStartBrackets = positionStartBrackets + 3;
        }
        let partString              = string.substr( 0, positionStartBrackets);
        this.outString              = string.substr( positionStartBrackets);
        return partString;
    }
    public getRestString() : string{
        return this.outString;
    }
}

export default EscapeTemplate;