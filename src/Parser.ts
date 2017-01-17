import ITypeElement       from './Interfaces/ITypeElement';
import ValueElement       from './TypeElement/ValueElement';
import ValueEscapeElement from './TypeElement/ValueEscapeElement';
import IfElement          from './TypeElement/IfElement';
import ElseElement        from './TypeElement/ElseElement'
import IfCloseElement     from './TypeElement/IfCloseElement';
import FilterElement      from './TypeElement/FilterElement';
import PartialElement     from './TypeElement/PartialElement';
import EachElement        from './TypeElement/EachElement';
import EachElementClose   from './TypeElement/EachElementClose';
import TextElement        from './TypeElement/TextElement';
import Data               from './Data';
import Element            from './TypeElement/Element';
import {normalizeText as normalizeHtml} from './Support/HtmlSupport';

/**
 * @property html                the input string HTML
 * @property htmlParsing         copy the input string to parse
 * @property collectionElements  a collection of objects after parsing  property htmlParsing
 * @property templateBrackets    template to insert values in HTML
 * @property DataLink            the reference to the object with current data
 * @property OutHtml             returns the template engine
 * @property toggle
 * @property toggleEach          switch now parsing loop {{each}}
 * @property lastLabelData
 * @property EachData            the actual data for a bust in loop {{each}}
 * @property currentCounter      the current iteration is on collectionElements
 * @property freezeCounter       freezing of iteration count, it is necessary to be able to return to the desired iterative step
 * @property currentDataEach     Boxing with the data to pass {{each}}
 * @constructor                  Loads source , line copies again for work, and loads the data to populate
 * @method   parsingHtml         Parses a string into its constituent elements
 * @method   factoryString       the method validates the values with a regular expression and return object
 * @method   builderOutHtml      causes all objects elements of one single method  "transform"
 */
class Parser{
    private   html               : string;
    private   htmlParsing        : string;
    private   collectionElements : Object[] = [];
    private   templateBrackets   : string[] = ['{{', '}}'];
    private   TripleStash        : string[] = ['{{{', '}}}']; // DEPRECATED ! while it does not matter
    private   DataLink           : Data;
    private   OutHtml            : string = '';
    protected toggle             : boolean = true;
    protected toggleEach         : boolean = false;
    protected lastLabelData      : string;
    protected EachData           : any;
    protected currentCounter     : number = 0;
    protected freezeCounter      : number = 0;
    protected currentDataEach    : any;
    protected cacheElement       : any[] = [];

    constructor(html : string, dataClient : Object){
        this.html         =  normalizeHtml(html);
        this.htmlParsing  =  normalizeHtml(html);
        this.DataLink     =  new Data(dataClient);
    }


    parsingHtml(){
        while( this.htmlParsing.length) {

            let positionStartBrackets  : number = this.htmlParsing.search(this.templateBrackets[0]);

            if (positionStartBrackets === -1) {
                this.collectionElements.push( this.factoryString(this.htmlParsing) );
                this.htmlParsing = '';
            }

            let partString              : string        = this.htmlParsing.substr( 0, positionStartBrackets );
            this.htmlParsing                            = this.htmlParsing.substr( positionStartBrackets );

                if( this.cacheElement[partString] === undefined) {
                    let TypeTextElement         : ITypeElement  = this.factoryString(partString);

                    if (TypeTextElement !== undefined ) {
                        this.collectionElements.push(TypeTextElement);
                        this.cacheElement[partString] = TypeTextElement;
                    }
                } else {
                    this.collectionElements.push( this.cacheElement[partString]);
                }



            let positionEndBrackets       : number       = this.htmlParsing.search(this.templateBrackets[1]);
            let partBrackets              : string       = this.htmlParsing.substr(0, positionEndBrackets + 2);
            this.htmlParsing                             = this.htmlParsing.substr(positionEndBrackets + 2);

            if( this.cacheElement[partBrackets] === undefined) {
                let TypeElement: ITypeElement = this.factoryString(partBrackets.trim());

                if (TypeElement !== undefined) {
                    this.collectionElements.push(TypeElement);
                    this.cacheElement[partBrackets] = TypeElement;
                }
            } else {
                this.collectionElements.push( this.cacheElement[partBrackets]);
            }
        }
        // console.log(  this.collectionElements );
    }

    factoryString(string : string) : ITypeElement{
        if ( new RegExp('{{\\s*#if [A-z]{1,}\\s*}}', 'g').test(string)) {
            return new IfElement(string, this, this.DataLink);
        }
        if ( new RegExp('{{\\s*#else\\s*}}', 'g').test(string)) {
            return new ElseElement(string, this, this.DataLink);
        }
        if ( new RegExp('{{\\s*\/if\\s*}}', 'g').test(string)) {
            return new IfCloseElement(string, this, this.DataLink);
        }
        if ( new RegExp('{{\\s*#each [A-z]{1,}\\s*}}', 'g').test(string)) {
            return new EachElement(string, this, this.DataLink);
        }
        if ( new RegExp('{{\s*\/each\s*}}', 'g').test(string)) {
            return new EachElementClose(string, this, this.DataLink);
        }
        if ( new RegExp('{{\\s*[A-z]+\\.*[A-z]*\\s*\\|\\s*[A-z]{1,}\\s*}}', 'g').test(string)) {
            return new FilterElement(string, this, this.DataLink);
        }
        if ( new RegExp('{{\\s*\!\![A-z]{1,}(\.[A-z]{1,})*\!\!\\s*}}', 'g').test(string) ) {
            return new ValueEscapeElement(string, this, this.DataLink);
        }
        if ( new RegExp('{{\\s*[A-z]{1,}(\.[A-z]{1,})*\\s*}}', 'g').test(string) ) {
            return new ValueElement(string, this, this.DataLink);
        }
        if ( new RegExp('{{&gt;\\s*[A-z]+\\s*.+}}', 'g').test(string) ) {
            return new PartialElement(string, this, this.DataLink);
        }

        if ( new RegExp('.+', 'g').test(string) ) {
            return new TextElement(string, this, this.DataLink);
        }
    }


    // Builder end of the row for output to the client
    builderOutHtml(){
        while ( this.collectionElements[this.currentCounter] !== undefined ) {
            this.OutHtml += this.collectionElements[this.currentCounter]['transform']();
            this.currentCounter++;
        }
    }

    public getOutHtml(){
       return this.OutHtml;
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
    public getEachData() : any {
        return this.EachData;
    }
    public getCurrentCounter() : number{
        return this.currentCounter;
    }
    public getFreezeCounter() : number {
        return this.freezeCounter;
    }
    public getСurrentDataEach() : any{
        return this.currentDataEach;
    }



    public setToogle(bool : boolean): void {
        this.toggle = bool;
    }
    public setToggleEach(bool : boolean): void{
        this.toggleEach = bool;
    }
    public setLastLabelData(string : string) : void{
        this.lastLabelData = string;
    }
    public setFreezeCounter(number : number){
        this.freezeCounter = number;
    }
    public setCurrentDataEach(currentValues : any){
        this.currentDataEach = currentValues;
    }
    public setCurrentCounter(number : number) {
        this.currentCounter = number;
    }
    public setEachData(data) : void{
        this.EachData = data;
    }
    public resetEachData() : void{
        this.EachData = '';
    }
    public setOutHtml(string : string) : void{
        this.OutHtml = string;
    }
}

export default Parser;