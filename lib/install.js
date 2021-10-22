'use strict';
const path = require('path');
const binBuild = require('bin-build');
const bin = require('.');

bin.run(['-version']).then(() => {
	console.log('pngcrush pre-build test passed successfully');
}).catch(async error => {
	console.warn(error.message);
	console.warn('pngcrush pre-build test failed');
	console.info('compiling from source');

	try {
		await binBuild.file(path.resolve(__dirname, '../vendor/source/pngcrush-1.8.13.tar.gz'), [
			`mkdir -p ${bin.dest()}`,
			`make && mv ${bin.use()} ${bin.path()}`
		]);

		console.log('pngcrush built successfully');
	} catch (error) {
		console.error(error.stack);

		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1);
	}
});
