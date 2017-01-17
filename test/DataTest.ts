/// <reference path="../typings/index.d.ts" />

import chai   = require('chai');
import Data from '../src/Data';

let subject : Data;
let dataobject  = {
    name      : 'name',
    firstName : 'firstName'
};
subject  = new Data(dataobject);
describe('Data', () =>  {
    before(function() {
    });
    describe('#instance', () =>  {
        it('the creation of the object Data', () =>  {
            chai.assert(subject instanceof  Data);
        });
    });
    describe('#getStartData', () => {
        it('test function getter getStartData', () => {
            chai.assert.deepEqual(subject.getStartData(), dataobject);
        })
    });

});
