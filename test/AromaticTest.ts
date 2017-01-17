/// <reference path="../typings/index.d.ts" />

import chai   = require('chai');
import Aromatic from '../src/Aromatic';

let func = (test) => {
    return `test string ${test}`;
};
Aromatic.registerFilter('Test', func);


describe('#Aromatic', () => {
    describe('#registerFilter', () => {
        it('fact register', () => {
            chai.assert.deepEqual(func, Aromatic.getFilter('Test'));
        });
        it('fail', () => {
            // chai.assert.equal(Aromatic.registerFilter('Test', func),'The filter "Test" already exists');
            // chai.expect(Aromatic.registerFilter('Test', func)).to.have.string('The filter Test already exists');
            chai.expect(Aromatic.registerFilter('Test', func)).to.throw(ReferenceError, /bad function/'ReferenceError: The filter "Test" already exists');
        });
    });
});