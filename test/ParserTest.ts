/// <reference path="../typings/index.d.ts" />
import chai   = require('chai');
import Parser             from '../src/Parser';
import Element            from '../src/TypeElement/Element';
import IfElement          from '../src/TypeElement/IfElement';
import ElseElement        from '../src/TypeElement/ElseElement';
import IfCloseElement     from '../src/TypeElement/IfCloseElement';
import EachElement        from '../src/TypeElement/EachElement';
import EachElementClose   from '../src/TypeElement/EachElementClose';
import FilterElement      from '../src/TypeElement/FilterElement';
import ValueEscapeElement from '../src/TypeElement/ValueEscapeElement';
import ValueElement       from '../src/TypeElement/ValueElement';
import PartialElement     from '../src/TypeElement/PartialElement';
import TextElement        from '../src/TypeElement/TextElement';

let ranomText = () => {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
};

let values       = {
        property : 'property'
};
let templateHtml = '<div></div>';
let parser       = new Parser(templateHtml, values);

describe('Parser', () => {
    describe('#new instance', () => {
        it('create new instance', () => {
            chai.assert.isTrue(parser instanceof Parser);
        });
    });
    describe('#parsingHtml', () => {
        it('return undefined', () => {
            chai.expect(parser.parsingHtml()).to.be.undefined;
        });
    });
    describe('#factoryString', () => {
        it('return object type Element', () => {
            chai.assert.isTrue(parser.factoryString('just text') instanceof Element);
        });
        it('return object type IfElelement', () => {
            chai.assert.isTrue(parser.factoryString('{{ #if test}}') instanceof IfElement);
        });
        it('return object type ElseElement', () => {
            chai.assert.isTrue(parser.factoryString('{{ #else}}') instanceof ElseElement);
        });
        it('return object type IfCloseElement', () => {
            chai.assert.isTrue(parser.factoryString('{{ /if}}') instanceof IfCloseElement);
        });
        it('return object type EachElement', () => {
            chai.assert.isTrue(parser.factoryString('{{ #each test}}') instanceof EachElement);
        });
        it('return object type EachElementClose', () => {
            chai.assert.isTrue(parser.factoryString('{{ /each }}') instanceof EachElementClose);
        });
        it('return object type FilterElement', () => {
            chai.assert.isTrue(parser.factoryString('{{ text | filter }}')      instanceof FilterElement);
            chai.assert.isTrue(parser.factoryString('{{ text.text | filter }}') instanceof FilterElement);
        });
        it('return object type ValueEscapeElement', () => {
            chai.assert.isTrue(parser.factoryString('{{  !!test!! }}') instanceof ValueEscapeElement);
            chai.assert.isTrue(parser.factoryString('{{  !!test.test!! }}') instanceof ValueEscapeElement);
        });
        it('return object type ValueElement', () => {
            chai.assert.isTrue(parser.factoryString('{{ test }}') instanceof ValueElement);
            chai.assert.isTrue(parser.factoryString('{{ test.test }}') instanceof ValueElement);
        });
        it('return object type PartialElement', () => {
            chai.assert.isTrue(parser.factoryString('{{&gt; userMessage tagName="h2" }}') instanceof PartialElement);
        });
        it('return object type TextElement', () => {
            chai.assert.isTrue(parser.factoryString(ranomText()) instanceof TextElement);
        });
    });
    describe('#getCollectionElements', () => {
        it(' have some container elements', () => {
            chai.expect(parser.getCollectionElements()).to.have.lengthOf(1);
        });
    });
});