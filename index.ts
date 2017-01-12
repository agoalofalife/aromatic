import Template from './src/Template';
import ObserverParseValues from './src/Observers/ObserverParseValues';
import ObserverParseValuesWithPoint from './src/Observers/ObserverParseValuesWithPoint';
import ObserverParseEach from './src/Observers/ObserverParseEach';
import Parser from './OtherDevelopers/Parser';

let node = document.querySelector('#test');

let context = {
    title: "My First Blog Post!",
    author: {
        id: 47,
        name: "Yehuda Katz"
    },
    body: "My first post. Wheeeee!",
    updates: [
        {
            name: 'Jane Doe',
            update: 'Just Made my Breakfaast',
            from: 'Web',
            location: 'Canada'
        },
        {
            name: 'John Doe',
            update: 'What is going on with the weather?',
            from: 'Phone',
        }
    ]
};
let parser = new Parser(node.innerHTML, context);
parser.parsingHtml();


// let template = new Template(node.innerHTML);
//     template.loadObject(context);
//
// template.attach(new ObserverParseValues());
// template.attach(new ObserverParseValuesWithPoint());
// template.attach(new ObserverParseEach());
//
//
// node.innerHTML = template.compile();