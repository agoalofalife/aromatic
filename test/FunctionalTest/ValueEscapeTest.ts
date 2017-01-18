/// <reference path="../../typings/index.d.ts" />

import chai   = require('chai');
import {Html,Values , afterCompile} from '../templateHtml/ValueEscapeTemplate';
import Aromatic                     from '../../src/Aromatic';


Aromatic.compile(Html, Values);
let response = Aromatic.getHtml();
describe('#ValuesEscapeFunctionality', () => {
    it('after compile escape expression', () => {
        chai.assert.equal(response, afterCompile);
    });
});