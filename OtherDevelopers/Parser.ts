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

/**
 * @property html                the input string HTML
 * @property htmlParsing         copy the input string to parse
 * @property collectionElements  a collection of objects after parsing  property htmlParsing
 * @property templateBrackets    template to insert values in HTML
 * @property DataLink            the reference to the object with current data
 * @property EachData            the actual data for a bust in loop {{each}}
 * @property currentCounter      the current iteration is on collectionElements
 *
 */
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
    protected EachData         : any;
    protected currentCounter   : number = 0;
    protected freezeCounter    : number = 0;
    protected currentDataEach  : any;

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
    // this.collectionElements.forEach( (item, key, sourceArray) => {
    //         // if ( this.toggleEach === true ) {
    //         //     this.LoopForEach(item,key);
    //         // } else {
    //         //     this.currentCounter = key;
    //         //     this.OutHtml +=  item['transform']();
    //         // }
    //
    //     this.OutHtml +=  sourceArray[key]['transform']();
    //
    // });


        while ( this.collectionElements[this.currentCounter] !== undefined ) {
            this.OutHtml = this.collectionElements[this.currentCounter]['transform']();
            this.currentCounter++;
        }
        // console.log( this.OutHtml );
        // let step = this.myGenerator();
        // console.log(step.next() );

    }

    // specially for Each
    LoopForEach(element, key : number){
        let start : number = key;

        this.OutHtml += this.collectionElements[start]['transform']();

    }

     *myGenerator() {
         for(let element in this.collectionElements){
              yield this.collectionElements[element]['transform']();
         }
   }

    public setOutHtml(string : string) : void{
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
}

export default Parser;