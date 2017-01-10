import TemplateObserver from '../Interfaces/TemplateObserver';
import Template from '../Template';

class ObserverParseEach implements TemplateObserver{
    template         : Template;
    baseString       : string;
    currentTemplate  : string   = '';
    collectionClaims : Object[] = []; // an array of claims
    templateBrackets : string[] = ['{{', '}}'];
    collection       : Object[] = [];
    stringBundler    : string   = '';
    toggleIf         : boolean  = true;
    namesEach        : string[] = [];

    update() {
        let normalizeText          = this.normalizeText();

        //  all matches each
        let arrayEach              = normalizeText.match(new RegExp('{{#each [A-z]{0,30}}}.+?{{\/each}}','g'));

        // through all each in global string
        arrayEach.forEach( stringEach => {
            // this.parse(stringEach);

            // to parse the array of values
            this.parseEach(stringEach);

            this.namesEach.push(stringEach.match('{{#each (.*?)}}')[1].trim());

        });

        this.namesEach.forEach( name => {
           if (  this.template.getData()[name] !== undefined ) {
               this.template.getData()[name].forEach( objectData => {
                   this.join(objectData);
               })
           }
        });

        this.template.setTemplate(this.stringBundler); //???

        console.log( this.stringBundler );
    }

    parseEach(stringEach : string) {
        stringEach                = this.cutBaseTemplate(stringEach);

        while( stringEach.length ) {
            let partText          = stringEach.substr(0, stringEach.search(this.templateBrackets[0]));
            stringEach            = stringEach.substr(stringEach.search(this.templateBrackets[0]));

            this.addCollection({
                type  : 'text',
                value : partText
            });


            let partBrackets      = stringEach.substr(0, stringEach.search(this.templateBrackets[1]) + 2);
            stringEach            = stringEach.substr(stringEach.search(this.templateBrackets[1])+ 2);
            this.addCollection({
                type  : this.GetType(partBrackets),
                value : partBrackets
            });
        }

    }


    join(data : Object){
        for (let element in this.collection) {
            switch (this.collection[element]['type']){
                case 'text' :
                    this.stringBundler += this.collection[element]['value'].trim();
                    break;
                case 'name' :
                    if ( this.toggleIf === true ) {
                        this.stringBundler +=  data[this.collection[element]['value'].match('[A-z]{1,}').shift()];
                    }
                    break;
                case 'if'   :
                    let ifName = this.collection[element]['value'].match('{{#if ([A-z]{1,})}}')[1];
                    if ( data[ifName] !== undefined ) {
                        this.toggleIf = true;
                    } else {
                        this.toggleIf = false;
                    }

                    break;
                case 'else' :
                    if ( this.toggleIf === true ) {

                        // вырезать else и то что после иначе вставить
                    }
                    break;
                case 'if-close' :
                    // ... наверное ничего не вставлять
                    break;
            }
        }
    }

    // to add a new item to collection
    addCollection(newObject : Object){
        this.collection.push(newObject);
    }


    GetType(brackets : string){

        if ( new RegExp('{{#if [A-z]{1,}', 'g').test(brackets)) {
            return 'if';
        }

        if ( new RegExp('{{#else}}', 'g').test(brackets)) {
            return 'else';
        }
        if ( new RegExp('{{/if}}', 'g').test(brackets)) {
            return 'if-close';
        }

        if ( new RegExp('{{[A-z]{1,}', 'g').test(brackets) ) {
            return 'name';
        }
        if ( new RegExp('.+', 'g').test(brackets) ) {
            return 'text';
        }
    }


    parse(allMatches : string) {

        let ifElseString    = allMatches.match('{{#if.+\/if}}');

        this.parseIfElse(ifElseString);

        let nameEach               = allMatches.match('{{#each (.*?)}}')[1].trim();

        // the data corresponding to the current {{#each something}}
        let dataForEach            = this.template.getData()[nameEach];

        this.baseString            = this.cutBaseTemplate(allMatches);

        for (let arr in dataForEach) {
            // copy template for insert current iteration
            let temp : string = this.baseString;

            for (let item in dataForEach[arr]) {

                // temp = temp.replace(new RegExp(`{{${item}}}`, 'g'), dataForEach[arr][item]);


                this.collectionClaims.forEach( (objectiIf, key, linkArray) => {

                    if ( dataForEach[arr][objectiIf['if']] !== undefined ) {

                    }



                    // if ( objectiIf['if'] === item ) {
                    //     temp =  temp.replace(  new RegExp(`{{#if [A-z]{1,}}}.+{{([A-z]{1,})}}.+{{#else}}|{{\/if}}`, 'g'), function (a, inGroup) {
                    //      console.log( a );
                    //         if ( inGroup !== undefined ) {
                    //             return dataForEach[arr][item];
                    //         }
                    //     });
                    //
                    //
                    //
                    //     // temp.replace(  new RegExp(`{{#if [A-z]{1,}}}.+{{([A-z]{1,})}}.+{{#else}}|{{\/if}}`, 'g'),'$1');
                    //     // console.log(temp ,'temp' );
                    //     temp =   temp.replace(new RegExp(`{{#if ${item}}}`, 'g'), '');
                    //     temp =   temp.replace(new RegExp('({{#else}}.+{{/if}})', 'g'), '');
                    //
                    //     linkArray.slice(key,1);
                    //     // console.log( linkArray );
                    // }
                });
            }
            this.currentTemplate +=  temp;

        }

        // console.log(  this.currentTemplate ,'currentTemplate');
    }

    // put template {{#each * }} and {{/each}}
    cutBaseTemplate(template : string) {
        let normalizeTemplate : string;

        let lengthFirst    =  template.match('{{#each [A-z]{0,50}}}').shift().length;
        normalizeTemplate  =  template.replace('{{\/each}}', '');
        normalizeTemplate  = normalizeTemplate.substr(lengthFirst, normalizeTemplate.length);

        return normalizeTemplate;
    }

    parseIfElse(templateIfElse : string[]) {

        let string : string;
        while ( string = templateIfElse.shift()) {

            // for future optimization
            this.collectionClaims.push({
                if        :  string.match('{{#if ([A-z]{1,})}}')[1],
                ifValue   :  string.match('{{#if [A-z]{1,}}}.+{{([A-z]{1,})}}')[1],
                else      :  new RegExp('{{#if [A-z]{1,}}}.+{{[A-z]{1,}}}.+({{#else}})').test(string),
                elseValue :  string.match('{{#if [A-z]{1,}}}.+{{[A-z]{1,}}}.+{{#else}}.+{{([A-z]{1,})}}') ? string.match('{{#if [A-z]{1,}}}.+{{[A-z]{1,}}}.+{{#else}}.+{{([A-z]{1,})}}')[1] : null
            });

        }

    }
    // removes all spaces from text
    normalizeText() : string {
        return this.template.getTemplate().replace(/\s{2,}/g, '');
    }

    setTemplate(template : Template) {
        this.template = template;
    }
}

export default ObserverParseEach;