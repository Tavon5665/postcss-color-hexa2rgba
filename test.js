var hexa = require('./index');
var postcss = require('postcss');
var expect = require('chai').expect;


describe('postcss-color-hexa2rgba', function() {

	function transform(source) {
		return postcss([hexa]).process(source).css;
	}

	it('short hex and full decimal', function(done) {
		expect(transform('body { background: #000000d9; }'))
			.to.equal('body { background: rgba(0, 0, 0, 0.85); }');
		done();
	});

});