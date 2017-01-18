/// <reference path="../../typings/index.d.ts" />

import chai   = require('chai');
import {Html,Values , afterCompile} from '../templateHtml/ValuesExpressionTemplate';
import Aromatic                     from '../../src/Aromatic';


Aromatic.compile(Html, Values);
let response = Aromatic.getHtml();
describe('#ValuesFunctionality', () => {
    it('after compile ', () => {
        chai.assert.equal(response, afterCompile);
    });
});