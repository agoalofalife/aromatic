import Template from '../Template';

interface TemplateObserver{
    update() : void
    setTemplate(template : Template) : void
}
export default TemplateObserver;
