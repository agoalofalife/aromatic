import TemplateObserver from '../Interfaces/TemplateObserver';
import Template from '../Template';

class ObserverParseValuesWithPoint implements TemplateObserver{
    template        : Template;

    update() {
        let data = this.template.getData();
       this.recData(data);
    }
    recData(data : any, lastIndex? : string){
        for (var value in data) {

            if ( data[value] instanceof Object ) {

                if (lastIndex !== undefined ) {
                    this.recData(data[value], `${lastIndex}.${value}`);
                } else {
                    this.recData(data[value], value);
                }

            } else {

                if ( lastIndex !== undefined ) {
                    // if in lastIndex have point , we need to normalize
                    if ( /\./.test(lastIndex) ) {
                        let currentObject =  this.normalizeProperty(lastIndex);
                        this.template.setTemplate(this.template.getTemplate().replace(new RegExp(`{{${lastIndex}.${value}}}`, 'g'), currentObject[value] ));
                    } else {
                        this.template.setTemplate(this.template.getTemplate().replace(new RegExp(`{{${lastIndex}.${value}}}`, 'g'), this.template.getData()[lastIndex][value] ));
                    }
                }
            }
        }
    }
    normalizeProperty(property : string) : Object{

        let temp : any = '';
        property.split('.').forEach( (item, key) => {
            if ( key === 0) {
                temp = this.template.getData()[item];
            } else {
                temp =  temp[item];
            }
        });

        return temp;
    }

    setTemplate(template : Template) {
        this.template = template;
    }
}

export default ObserverParseValuesWithPoint;