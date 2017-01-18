/// <reference path="../../typings/index.d.ts" />

import chai   = require('chai');
import {deepEqual} from '../../src/Support/ObjectSupport';

let obj1 = {
    test : 'test',
    test1 : {
        e : 'ee'
    }
};
let obj2 = {
    test : 'test',
    test1 : {
        e : 'ee'
    }
};
let objFail = {
    sdf : '2'
};
describe('ObjectSupport', () => {
    describe('#deepEqual', () => {
        it('check deepEqual', () => {
            chai.assert.isTrue(deepEqual(obj1, obj2));
        });
        it('check deepEqual for fail', () => {
            chai.assert.isNotTrue(deepEqual(obj1, objFail));
        });
    });

});