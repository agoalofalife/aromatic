import TemplateObserver from '../Interfaces/TemplateObserver';
import Template from '../Template';

class ObserverParseValues implements TemplateObserver{
    template        : Template;

    update() {
        for (var value in this.template.getData()) {
            this.template.setTemplate(this.template.getTemplate().replace(new RegExp(`{{ ${value} }}`, 'g'), this.template.getData()[value]));
        }
    }
    setTemplate(template : Template) {
        this.template = template;
    }
}

export default ObserverParseValues;