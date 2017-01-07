import TemplateObserver from './TemplateObserver';

interface ObserverSubject{
    attach(Observer : TemplateObserver)  : void
    dettach(Observer : TemplateObserver) : void
    compile()  : void
}
export default ObserverSubject;