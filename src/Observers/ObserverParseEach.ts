import TemplateObserver from '../Interfaces/TemplateObserver';
import Template from '../Template';

class ObserverParseEach implements TemplateObserver{
    template         : Template;
    baseString       : string;
    currentTemplate  : string   = '';
    collectionClaims : Object[] = []; // an array of claims

    update() {
        let normalizeText          = this.normalizeText();

        //  all matches each
        let arrayEach              = normalizeText.match(new RegExp('{{#each [A-z]{0,30}}}.+?{{\/each}}','g'));

        // through all each in global string
        arrayEach.forEach( stringEach => {
            this.parse(stringEach);
        });


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