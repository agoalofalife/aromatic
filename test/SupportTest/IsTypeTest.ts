/// <reference path="../../typings/index.d.ts" />

import chai   = require('chai');
import {isUndefined,isNotUndefined} from '../../src/Support/IsType';

describe('isType', () => {
    describe('#isUndefined', () => {
        it('insert parameter equals return undefined', () => {
            chai.assert.isTrue(isUndefined(undefined));
        });
        it('insert parameter unequals return undefined', () => {
            chai.assert.isNotTrue(isUndefined('test'));
        });
    });
    describe('#isNotUndefined', () => {
        it('insert parameter unequals return undefined', () => {
            chai.assert.isTrue(isNotUndefined('test'));
        });
        it('insert parameter equals return undefined', () => {
            chai.assert.isNotTrue(isNotUndefined(undefined));
        });
    });

});
