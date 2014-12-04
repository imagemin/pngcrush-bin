'use strict';

var bin = require('./');
var BinBuild = require('bin-build');
var log = require('logalot');

/**
 * Install binary and check whether it works
 * If the test fails, try to build it
 */

bin.run(['-version'], function (err) {
	if (err) {
		log.warn(err.message);
		log.warn('pngcrush pre-build test failed');
		log.info('compiling from source');

		var builder = new BinBuild()
			.src('http://downloads.sourceforge.net/project/pmt/pngcrush/' + bin.v + '/pngcrush-' + bin.v + '.zip')
			.cmd('mkdir -p ' + bin.dest())
			.cmd('make && mv ' + bin.use() + ' ' + bin.path());

		return builder.run(function (err) {
			if (err) {
				log.error(err.stack);
				return;
			}

			log.success('pngcrush built successfully');
		});
	}

	log.success('pngcrush pre-build test passed successfully');
});
