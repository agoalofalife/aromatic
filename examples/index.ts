import Aromatic from '../src/Aromatic';

let node = document.querySelector('#test');

let context = {
     loop :[ { firstname : 'Ilya', lastname : 'Chubarov' },
        { firstname : 'Maria', lastname : 'Ivanova' },
        { firstname : 'Misha', lastname : 'Bootosov', age : 20 },
    {
        firstname : 'Misha',
        lastname : 'Bootosov',
        age : 20 ,
        child : {
            name : 'To'
        }
    } ]
};

Aromatic.registerFilter('toLowerCase', function(test) {
    return test.test.toLowerCase();
});

Aromatic.compile(node.innerHTML, context);



node.innerHTML  = Aromatic.getHtml();


