import {normalizeText as normalizeHtml} from './Support/HtmlSupport';
import ITypeElement  from './Interfaces/ITypeElement';
import ValueElement from './TypeElement/ValueElement';
import IfElement from './TypeElement/IfElement';
import ElseElement from './TypeElement/ElseElement'
import IfCloseElement from './TypeElement/IfCloseElement';
import TextElement from './TypeElement/TextElement';



class Parser{
    private html               : string;
    private htmlParsing        : string;
    private collectionElements : Object[] = [];
    private templateBrackets   : string[] = ['{{', '}}'];
    private currentContext     : string;

    constructor(html : string){
        this.html         =  normalizeHtml(html);
        this.htmlParsing  =  normalizeHtml(html);
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
        console.log(  this.collectionElements );
    }

    factoryString(string : string) : ITypeElement{
        if ( new RegExp('{{#if [A-z]{1,}', 'g').test(string)) {
            return new IfElement(string, this);
        }

        if ( new RegExp('{{#else}}', 'g').test(string)) {
            return new ElseElement(string, this);
        }
        if ( new RegExp('{{/if}}', 'g').test(string)) {
            return new IfCloseElement(string, this);
        }

        if ( new RegExp('{{[A-z]{1,}', 'g').test(string) ) {
            return new ValueElement(string, this);
        }
        if ( new RegExp('.+', 'g').test(string) ) {
            return new TextElement(string, this);
        }
    }


    public getCurrentContext() : string{
        return this.currentContext;
    }
}

export default Parser;