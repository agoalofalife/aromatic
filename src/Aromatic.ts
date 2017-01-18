import Parser from './Parser';

/**
 * @class                     This is a base class which encapsulates all of the logic
 * @property linkParser       Link class Parser
 * @property FilterBox        Storing custom filters
 * @property PartialBox       Storing custom partials NOT IMPLEMENTED
 *
 * @method   registerFilter   Registration and add new custom  function for handler values
 * @method   getFilter        return custom function which insert in parameters
 * @method   registerPartial  NOT IMPLEMENTED , future functionality
 * @method   getPartial       NOT IMPLEMENTED , future functionality
 * @method   compile          Handles all expressions and saves in memory the original string
 * @method   getHtml          To get the string after handlers
 */
class Aromatic {
    static linkParser : Parser;
    static FilterBox  : Object[] = [];
    static PartialBox : String[] = [];

    static registerFilter(nameFilter : string, fn : Function) : any{
        if ( this.FilterBox[nameFilter] !== undefined ) {
            throw new Error(`The filter "${nameFilter}" already exists`);
        }
        this.FilterBox[nameFilter] = fn;
    }
    static getFilter(filterName : string) : any{
        return this.FilterBox[filterName];
    }


    // NOT IMPLEMENTED
    static registerPartial(name : string, html : string){
        if ( this.PartialBox[name] !== undefined ) {
            return console.error(`The filter "${name}" already exists`)
        }
        this.PartialBox[name] = html;
    }
    // NOT IMPLEMENTED
    static getPartial(name : string) : string{
        return this.PartialBox[name];
    }


    static compile(html : string, context : Object){
        this.linkParser = new Parser(html, context);
        this.linkParser .parsingHtml();
        this.linkParser .builderOutHtml();
    }

    static getHtml() : string{
        return this.linkParser.getOutHtml();
    }
}

export default Aromatic;