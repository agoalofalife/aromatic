import Aromatic from './src/Aromatic';

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
                    test : 'FUCK?!!!'
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

Aromatic.registerFilter('toLowerCase', function(test) {
    return test.test.toLowerCase();
});

Aromatic.compile(node.innerHTML, context);



node.innerHTML  = Aromatic.getHtml();


