/// <reference path="../../typings/index.d.ts" />

import chai   = require('chai');
import {Html,Values , afterCompile} from '../templateHtml/FilterTemplate';
import Aromatic                     from '../../src/Aromatic';

Aromatic.registerFilter('upperCase', function(title) {
    return title.toLocaleUpperCase();
});

Aromatic.compile(Html, Values);
let response = Aromatic.getHtml();
describe('#EachFunctionality', () => {
    it('equals after compile', () => {
        chai.assert.equal(response, afterCompile);
    });
});