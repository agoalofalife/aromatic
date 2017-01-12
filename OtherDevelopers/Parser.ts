import {normalizeText as normalizeHtml} from './Support/HtmlSupport';
import ITypeElement  from './Interfaces/ITypeElement';
import ValueElement from './TypeElement/ValueElement';
import IfElement from './TypeElement/IfElement';
import ElseElement from './TypeElement/ElseElement'
import IfCloseElement from './TypeElement/IfCloseElement';
import TextElement from './TypeElement/TextElement';
import Data from './Data';


class Parser{
    private html               : string;
    private htmlParsing        : string;
    private collectionElements : Object[] = [];
    private templateBrackets   : string[] = ['{{', '}}'];
    private currentContext     : string;
    private DataLink           : Data;

    constructor(html : string, dataClient : Object){
        this.html         =  normalizeHtml(html);
        this.htmlParsing  =  normalizeHtml(html);
        this.DataLink     = new Data(dataClient);
    }


    parsingHtml(){
        while( this.htmlParsing.length) {
            let partString              = this.htmlParsing.substr( 0, this.htmlParsing.search(this.templateBrackets[0]) );
            this.htmlParsing            = this.htmlParsing.substr( this.htmlParsing.search(this.templateBrackets[0]) );
            this.collectionElements.push(this.factoryString(partString));

            let partBrackets      = this.htmlParsing.substr(0, this.htmlParsing.search(this.templateBrackets[1]) + 2);
            this.htmlParsing      = this.htmlParsing.substr(this.htmlParsing.search(this.templateBrackets[1])+ 2);
            this.collectionElements.push(this.factoryString(partBrackets));

        }
        // console.log(  this.collectionElements );
    }

    factoryString(string : string) : ITypeElement{
        if ( new RegExp('{{#if [A-z]{1,}', 'g').test(string)) {
            return new IfElement(string, this, this.DataLink);
        }

        if ( new RegExp('{{#else}}', 'g').test(string)) {
            return new ElseElement(string, this, this.DataLink);
        }
        if ( new RegExp('{{/if}}', 'g').test(string)) {
            return new IfCloseElement(string, this, this.DataLink);
        }

        if ( new RegExp('{{[A-z]{1,}', 'g').test(string) ) {
            return new ValueElement(string, this, this.DataLink);
        }
        if ( new RegExp('.+', 'g').test(string) ) {
            return new TextElement(string, this, this.DataLink);
        }
    }

    builderOutHtml(){

    }



    public getCurrentContext() : string{
        return this.currentContext;
    }
}

export default Parser;