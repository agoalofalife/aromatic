/// <reference path="../../typings/index.d.ts" />

import chai   = require('chai');
import {escapeHtml,normalizeText} from '../../src/Support/HtmlSupport';

let template          : string          = '<div><h1></h1></div>';
let templateWithSpace : string          = '      <div>     <h1>         </h1>      </div>         ';

describe('HtmlSupportTest', () => {
    describe('#escapeHtml', () => {
        it('return undefined and all ok', () => {
            chai.expect(escapeHtml(template).match(/<|>/)).to.be.null;
        });
    });
    describe('#normalizeText', () => {
        it('string after cut space without  > <', () => {
            chai.assert.notEqual(normalizeText(templateWithSpace) ,templateWithSpace);
        });
    });
});