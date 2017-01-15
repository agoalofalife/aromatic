import Parser from './OtherDevelopers/Parser';
import Aromatic from './OtherDevelopers/Aromatic';

let node = document.querySelector('#test');

let context = {
    title: "<p>My First Blog Post!</p>",
    author: {
        id: 47,
        name: "Yehuda Katz"
    },
    body: "<h1>My first post. Wheeeee!</h1>",
    updates: [
        {
            name: 'Jane Doe',
            update: 'Just Made my Breakfaast',
            from: 'Web',
            location: 'Canada',
            test : {
                test : '<h1>Yess!!</h1>'
            }
        },
        {
            name: 'John Doe',
            update: 'What is going on with the weather?',
            from: 'Phone',
        }
    ]
};
// OLD CODE
// let parser = new Parser(node.innerHTML, context);
// parser.parsingHtml();
// parser.builderOutHtml();
// node.innerHTML = parser.getOutHtml();

Aromatic.registerFilter('tolowercase', function(test) {
    // return person.firstName + " " + person.lastName;
    console.log( '??' );
});

console.log(Aromatic.FilterBox,'FilterBox');

Aromatic.compile(node.innerHTML, context);
node.innerHTML  = Aromatic.getHtml();


