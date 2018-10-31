'use strict';
const binBuild = require('bin-build');
const log = require('logalot');
const bin = require('.');

bin.run(['-version']).then(() => {
	log.success('pngcrush pre-build test passed successfully');
}).catch(error => {
	log.warn(error.message);
	log.warn('pngcrush pre-build test failed');
	log.info('compiling from source');

	binBuild.url('https://downloads.sourceforge.net/project/pmt/pngcrush/1.8.13/pngcrush-1.8.13.zip', [
		`mkdir -p ${bin.dest()}`,
		`make && mv ${bin.use()} ${bin.path()}`
	]).then(() => {
		log.success('pngcrush built successfully');
	}).catch(error => {
		log.error(error.stack);
	});
});
