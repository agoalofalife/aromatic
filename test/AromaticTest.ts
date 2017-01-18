/// <reference path="../typings/index.d.ts" />

import chai   = require('chai');
import Aromatic from '../src/Aromatic';

let func = (test) => {
    return `test string ${test}`;
};
Aromatic.registerFilter('Test', func);
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

describe('#Aromatic', () => {
    describe('#registerFilter', () => {
        it('fact register', () => {
            chai.assert.deepEqual(func, Aromatic.getFilter('Test'));
        });
        it('fail duplication registerFilter', () => {
            chai.expect(() => Aromatic.registerFilter('Test', func)).to.throw('The filter "Test" already exists');
        });
    });

    describe('#compile', () => {
        it('return undefined and all ok', () => {
            chai.expect(Aromatic.compile('<div></div>', context)).to.be.undefined;
        });
        it('compile equals getHtml', () => {
            chai.assert.equal(Aromatic.getHtml(), '<div></div>');
        })
    });
});