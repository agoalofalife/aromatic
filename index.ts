import Aromatic from './OtherDevelopers/Aromatic';
import {idObject} from  './OtherDevelopers/Support/ObjectSupport';

let t = {
    test : 'test'
};

console.log( t.toString.call(idObject) );
// console.log( idObject() );
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
                test : '<h1>Yess!!</h1>',
                tree : {
                    test : 'Fuck?!!!'
                }
            }
        },
        {
            name: 'John Doe',
            update: 'What is going on with the weather?',
            from: 'Phone',
        }
    ]
};

Aromatic.registerFilter('tolowercase', function(test) {
    return test.test + " " + test.test;
});

Aromatic.compile(node.innerHTML, context);
node.innerHTML  = Aromatic.getHtml();


