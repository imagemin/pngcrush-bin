'use strict';
const path = require('path');
const binBuild = require('bin-build');
const log = require('logalot');
const bin = require('.');

bin.run(['-version']).then(() => {
	log.success('pngcrush pre-build test passed successfully');
}).catch(async error => {
	log.warn(error.message);
	log.warn('pngcrush pre-build test failed');
	log.info('compiling from source');

	try {
		await binBuild.file(path.resolve(__dirname, '../vendor/source/pngcrush-1.8.13.tar.gz'), [
			`mkdir -p ${bin.dest()}`,
			`make && mv ${bin.use()} ${bin.path()}`
		]);

		log.success('pngcrush built successfully');
	} catch (error) {
		log.error(error.stack);

		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1);
	}
});
