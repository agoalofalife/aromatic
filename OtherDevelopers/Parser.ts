import {normalizeText as normalizeHtml} from './Support/HtmlSupport';
import ITypeElement  from './Interfaces/ITypeElement';
import ValueElement from './TypeElement/ValueElement';
import IfElement from './TypeElement/IfElement';
import ElseElement from './TypeElement/ElseElement'
import IfCloseElement from './TypeElement/IfCloseElement';
import EachElement from './TypeElement/EachElement';
import EachElementClose from './TypeElement/EachElementClose';
import TextElement from './TypeElement/TextElement';
import Data from './Data';


class Parser{
    private html               : string;
    private htmlParsing        : string;
    private collectionElements : Object[] = [];
    private templateBrackets   : string[] = ['{{', '}}'];
    private DataLink           : Data;
    private OutHtml            : string = '';
    protected toggle           : boolean = true;
    protected toggleEach       : boolean = false;
    protected lastLabelData    : string;

    constructor(html : string, dataClient : Object){
        this.html         =  normalizeHtml(html);
        this.htmlParsing  =  normalizeHtml(html);
        this.DataLink     = new Data(dataClient);
    }


    parsingHtml(){
        while( this.htmlParsing.length) {
            let partString              = this.htmlParsing.substr( 0, this.htmlParsing.search(this.templateBrackets[0]) );
            this.htmlParsing            = this.htmlParsing.substr( this.htmlParsing.search(this.templateBrackets[0]) );
            let TypeTextElement         = this.factoryString(partString);
            if (TypeTextElement !== undefined ) {
                this.collectionElements.push(TypeTextElement);
            }

            let partBrackets      = this.htmlParsing.substr(0, this.htmlParsing.search(this.templateBrackets[1]) + 2);
            this.htmlParsing      = this.htmlParsing.substr(this.htmlParsing.search(this.templateBrackets[1])+ 2);
            let TypeElement       = this.factoryString(partBrackets.trim());
            if (TypeElement !== undefined ) {
                this.collectionElements.push(TypeElement);
            }


        }

        console.log(  this.collectionElements );
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
        if ( new RegExp('{{#each [A-z]{1,}', 'g').test(string)) {
            return new EachElement(string, this, this.DataLink);
        }
        if ( new RegExp('{{/each}}', 'g').test(string)) {
            return new EachElementClose(string, this, this.DataLink);
        }
        if ( new RegExp('{{[A-z]{1,}', 'g').test(string) ) {
            return new ValueElement(string, this, this.DataLink);
        }
        if ( new RegExp('.+', 'g').test(string) ) {
            return new TextElement(string, this, this.DataLink);
        }
    }


    builderOutHtml(){

    this.collectionElements.forEach( item => {
           this.OutHtml +=  item['transform']();
    });
    console.log( this.OutHtml );
    }

    public setOutHtml(string : string){
        this.OutHtml = string;
    }

    public getToggle() : boolean{
        return this.toggle;
    }
    public getToggleEach(): boolean{
        return this.toggleEach;
    }
    public getLastLabelData() : string{
        return this.lastLabelData;
    }

    public setToogle(bool : boolean) {
        this.toggle = bool;
    }
    public setToggleEach(bool : boolean){
        this.toggleEach = bool;
    }
    public setLastLabelData(string : string){
        this.lastLabelData = string;
    }
}

export default Parser;