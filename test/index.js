'use strict';

// Load modules

const Lab = require('lab');
const Code = require('code');

// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('hapi-aws-lambda', () => {

    it('can do basic math', (done) => {

        expect(1).to.equal(1);
        done();
    });

});
