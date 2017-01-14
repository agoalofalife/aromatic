import TypeTemplate from '../Enums/TypeTemplate';

/**
 * @description The structure expresses the pattern Chain Of Responsibilities
 */
abstract class Template{
    protected successor : Template;


    public constructor(template : Template = null){
        this.successor = template;
    }

     public handle(string : string, type : TypeTemplate) : any{
         let processed = this.processing(string, type);

         if (processed === null) {

             if (this.successor !== null) {
                 processed = this.successor.handle(string, type);
             }
         }
         return processed;
     }

    abstract  processing(string : string, type : TypeTemplate) : any;
}

export default Template;