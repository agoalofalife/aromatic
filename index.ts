import Template from './src/Template';
import ObserverParseValues from './src/Observers/ObserverParseValues';
import ObserverParseValuesWithPoint from './src/Observers/ObserverParseValuesWithPoint';
import ObserverParseEach from './src/Observers/ObserverParseEach';
import Parser from './OtherDevelopers/Parser';

let node = document.querySelector('#test');

let context = {
    title: "<h1>My First Blog Post!</h1>",
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
parser.builderOutHtml();
node.innerHTML = parser.getOutHtml();

// let template = new Template(node.innerHTML);
//     template.loadObject(context);
//
// template.attach(new ObserverParseValues());
// template.attach(new ObserverParseValuesWithPoint());
// template.attach(new ObserverParseEach());
//
//
// node.innerHTML = template.compile();