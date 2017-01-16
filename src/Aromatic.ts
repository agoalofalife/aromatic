import Parser from './Parser';

class Aromatic {
    static linkParser : Parser;
    static FilterBox  : Object[] = [];
    static PartialBox : String[] = [];

    static registerFilter(nameFilter : string, fn : Function) : any{
        if ( this.FilterBox[nameFilter] !== undefined ) {
            console.error(`The filter "${nameFilter}" already exists`)
        }
        this.FilterBox[nameFilter] = fn;
    }

    static registerPartial(name : string, html : string){
        if ( this.PartialBox[name] !== undefined ) {
            console.error(`The filter "${name}" already exists`)
        }
        this.PartialBox[name] = html;
    }

    static getPartial(name : string) : string{
        return this.PartialBox[name];
    }

    static getFilter(filterName : string) : any{
        return this.FilterBox[filterName];
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