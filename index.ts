import Template from './src/Template';
import ObserverParseValues from './src/Observers/ObserverParseValues';
import ObserverParseValuesWithPoint from './src/Observers/ObserverParseValuesWithPoint';

let node = document.querySelector('#test');

let context = {
    title: "My First Blog Post!",
    author: {
        id: 47,
        name: "Yehuda Katz"
    },
    body: "My first post. Wheeeee!"
};

let template = new Template(node.innerHTML);
    template.loadObject(context);

template.attach(new ObserverParseValues());
template.attach(new ObserverParseValuesWithPoint());


node.innerHTML = template.compile();