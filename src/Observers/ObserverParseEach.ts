import TemplateObserver from '../Interfaces/TemplateObserver';
import Template from '../Template';

class ObserverParseEach implements TemplateObserver{
    template        : Template;
    baseString      : string;
    currentTemplate : string = '';

    update() {
        let normalizeText          = this.normalizeText();

        //  all matches each
        let arrayEach              = normalizeText.match(new RegExp('{{#each [A-z]{0,30}}}.+?{{\/each}}','g'));
        arrayEach.forEach( stringEach => {
            this.parse(stringEach);
        });


    }

    parse(allMathes : string) {
        let ifElseString    = allMathes.match('({{#if.+)({{\/if}})').shift();

        // let preEach       = allMathes.match('({{#each [A-z]{0,50})').shift();
        // let nameArray     = preEach.substr(7, preEach.length).trim();
        let nameArray       = allMathes.match('{{#each (.*?)}}')[1].trim();
        let each            = this.template.getData()[nameArray];

        this.baseString     = this.cutBaseTemplate(allMathes);


        for (let arr in each) {
            // copy template for insert current iteration
            let temp : string = this.baseString;

            var test : string;
            for (let item in each[arr]) {

                temp = temp.replace(new RegExp(`{{${item}}}`, 'g'), each[arr][item]);

               ifElseString.replace(new RegExp('', 'g'), function (match, p1, string) {

                   test = string.replace(`{{#if ${item}}}`, `if(each[arr][item])`);
                   test = test.replace(`{{${item}}}`, `each[arr][item]`);
                   test = test.replace(`{{#else}}`, `else`);
                   test = test.replace(`{{${item}}}`, `each[arr][item]`);
                   test = test.replace(`{{/if}}`, ``);

                   console.log( test );
                    return string;
                });
            }
            this.currentTemplate +=  temp;

        }

        // console.log(  this.currentTemplate );
    }

    // put template {{#each * }} and {{/each}}
    cutBaseTemplate(template : string) {
        let normalizeTemplate : string;

        let lengthFirst    =  template.match('{{#each [A-z]{0,50}}}').shift().length;
        normalizeTemplate  =  template.replace('{{\/each}}', '');
        normalizeTemplate  = normalizeTemplate.substr(lengthFirst, normalizeTemplate.length);

        return normalizeTemplate;
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