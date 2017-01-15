import Parser from './Parser';

class Aromatic {
    static linkParser : Parser;
    static FilterBox  : Object[] = [];

    static registerFilter(nameFilter : string, fn : Function) : any{
        if ( this.FilterBox[nameFilter] !== undefined ) {
            console.error(`The filter "${nameFilter}" already exists`)
        }
        this.FilterBox[nameFilter] = fn;
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