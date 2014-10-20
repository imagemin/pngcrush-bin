'use strict';

var binCheck = require('bin-check');
var BinBuild = require('bin-build');
var compareSize = require('compare-size');
var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');
var test = require('ava');
var tmp = path.join(__dirname, 'tmp');

test('rebuild the pngcrush binaries', function (t) {
	t.plan(2);

	var version = require('../').version;
	var builder = new BinBuild()
		.src('http://downloads.sourceforge.net/project/pmt/pngcrush/' + version + '/pngcrush-' + version + '.zip')
		.cmd('mkdir -p ' + tmp)
		.cmd('make && mv pngcrush ' + path.join(tmp, 'pngcrush'));

	builder.run(function (err) {
		t.assert(!err, err);

		fs.exists(path.join(tmp, 'pngcrush'), function (exists) {
			t.assert(exists);
		});
	});
});

test('return path to binary and verify that it is working', function (t) {
	t.plan(2);

	binCheck(require('../').path, ['-version'], function (err, works) {
		t.assert(!err, err);
		t.assert(works);
	});
});

test('minify a PNG', function (t) {
	t.plan(3);

	var src = path.join(__dirname, 'fixtures/test.png');
	var dest = path.join(__dirname, 'tmp/test.png');
	var args = [
		'--recompress',
		'--shrink-extra',
		src,
		dest
	];

	execFile(require('../').path, args, function (err) {
		t.assert(!err, err);

		compareSize(src, dest, function (err, res) {
			t.assert(!err, err);
			t.assert(res[dest] < res[src]);
		});
	});
});
