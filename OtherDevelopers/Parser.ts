import {normalizeText as normalizeHtml} from './Support/HtmlSupport';


class Parser{
    private html              : string;
    private htmlParsing       : string;
    private collectionElments : Object[];
    private templateBrackets  : string[] = ['{{', '}}'];
    private currentContext    : string;

    constructor(html : string){
        this.html        = normalizeHtml(html);
        this.htmlParsing = normalizeHtml(html);
    }

    parsingHtml(){
        while( this.htmlParsing.length ) {
            let test = this.htmlParsing.substr( 0, this.htmlParsing.search(this.templateBrackets[0]) );

            this.parseString(test);
        }
    }

    parseString(string : string){

    }
}

export default Parser;