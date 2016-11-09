/* eslint-env mocha */
'use strict';

var assert = require('assert');
var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');
var binCheck = require('bin-check');
var BinBuild = require('bin-build');
var compareSize = require('compare-size');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
var tmp = path.join(__dirname, 'tmp');

beforeEach(function () {
	mkdirp.sync(tmp);
});

afterEach(function () {
	rimraf.sync(tmp);
});

it('rebuild the pngcrush binaries', function (cb) {
	new BinBuild()
		.src('https://downloads.sourceforge.net/project/pmt/pngcrush/1.8.10/pngcrush-1.8.10.zip')
		.cmd('mkdir -p ' + tmp)
		.cmd('make && mv pngcrush ' + path.join(tmp, 'pngcrush'))
		.run(function (err) {
			assert(!err);
			assert(fs.statSync(path.join(tmp, 'pngcrush')).isFile());
			cb();
		});
});

it('return path to binary and verify that it is working', function (cb) {
	binCheck(require('../'), ['-version'], function (err, works) {
		assert(!err);
		assert(works);
		cb();
	});
});

it('minify a PNG', function (cb) {
	var src = path.join(__dirname, 'fixtures/test.png');
	var dest = path.join(__dirname, 'tmp/test.png');
	var args = [
		'--recompress',
		'--shrink-extra',
		src,
		dest
	];

	execFile(require('../'), args, function (err) {
		assert(!err);

		compareSize(src, dest, function (err, res) {
			assert(!err);
			assert(res[dest] < res[src]);
			cb();
		});
	});
});
