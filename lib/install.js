'use strict';

var bin = require('./');
var BinBuild = require('bin-build');
var logSymbols = require('log-symbols');

/**
 * Install binary and check whether it works
 * If the test fails, try to build it
 */

bin.run(['-version'], function (err) {
	if (err) {
		console.log(logSymbols.warning + ' pre-build test failed, compiling from source...');

		var move = process.platform === 'win32' ? 'move' : 'mv';
		var builder = new BinBuild()
			.src('http://downloads.sourceforge.net/project/pmt/pngcrush/' + bin.v + '/pngcrush-' + bin.v + '.zip')
			.cmd('mkdir -p ' + bin.dest())
			.cmd('make && ' + move + ' ' + bin.use() + ' ' + bin.path());

		return builder.build(function (err) {
			if (err) {
				return console.log(logSymbols.error, err);
			}

			console.log(logSymbols.success + ' pngcrush built successfully!');
		});
	}

	console.log(logSymbols.success + ' pre-build test passed successfully!');
});
