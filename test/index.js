// Load modules

var Lab = require('lab');
var Code = require('code');
var Injoi = require('..');

// Test shortcuts

var lab = exports.lab = Lab.script();
var before = lab.before;
var after = lab.after;
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

describe('hapi-aws-lambda', function () {

    it('can do basic math', function (done) {

        expect(1).to.equal(1);
        done();
    });

});
