import Template from './src/Template';
import ObserverParseValues from './src/Observers/ObserverParseValues';
import ObserverParseValuesWithPoint from './src/Observers/ObserverParseValuesWithPoint';

let node = document.querySelector('#test');

let testData   = {
    html : 'test',
    rest : {
        rest2 : '23',
        rest3 : {
            re : '!!!!'
        }
    }
};

let template = new Template(node.innerHTML);
    template.loadObject(testData);

template.attach(new ObserverParseValues());
template.attach(new ObserverParseValuesWithPoint());


node.innerHTML = template.compile();