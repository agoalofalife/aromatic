/// <reference path="../typings/index.d.ts" />

import assert = require('assert');
import chai   = require('chai');

import Data from '../src/Data';

describe('Data', () =>  {

    describe('#instance', () =>  {
        let subject : Data;
        it('the creation of the object Data', () =>  {
            let dataobject  = {
              name      : 'name',
              firstName : 'firstName'
            };

            subject = new Data(dataobject);
            chai.assert(subject instanceof  Data);
        });
    });
    describe('#getStartData', () => {
        it('test function getter getStartData', () => {
            chai.assert(true)
        })
    });

});
