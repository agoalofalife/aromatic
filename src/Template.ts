import ObserverSubject from './Interfaces/ObserverSubject';
import TemplateObserver from './Interfaces/TemplateObserver';

class Template implements ObserverSubject{
    // base template string from client
    protected template   : string;
    // data from client
    protected data       : Object;
    // container in observers
    observers  : TemplateObserver[] = [];

    symbolBase : string = `{{}}`;

    constructor(template: string) {
        this.template = template;
    }
    loadObject(data : Object) : void{
        this.data = data;
    }

    attach(Observer : TemplateObserver){
        Observer.setTemplate(this);
        this.observers.push(Observer);
    }
    dettach(Observer : TemplateObserver) {
        this.observers = this.observers.filter( value => {
            return value === Observer;
        })
    }
    compile() {
        for (let observer of this.observers) {
          observer.update();
        }

        return  this.template;
    }

    getTemplate () :string{
        return this.template;
    }
    setTemplate(template : string) : void{
        this.template = template;
    }
    getData() : Object {
        return this.data;
    }
}

export default Template;