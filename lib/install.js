import process from 'node:process';
import {fileURLToPath} from 'node:url';
import binBuild from 'bin-build';
import bin from './index.js';

bin.run(['-version']).then(() => {
	console.log('pngcrush pre-build test passed successfully');
}).catch(async error => {
	console.warn(error.message);
	console.warn('pngcrush pre-build test failed');
	console.info('compiling from source');

	try {
		const source = fileURLToPath(new URL('../vendor/source/pngcrush-1.8.13.tar.gz', import.meta.url));

		await binBuild.file(source, [
			`mkdir -p ${bin.dest()}`,
			`make && mv ${bin.use()} ${bin.path()}`,
		]);

		console.log('pngcrush built successfully');
	} catch (error) {
		console.error(error.stack);

		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1);
	}
});
