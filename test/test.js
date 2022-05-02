import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import test from 'ava';
import {execa} from 'execa';
import {temporaryDirectory} from 'tempy';
import binCheck from 'bin-check';
import binBuild from 'bin-build';
import compareSize from 'compare-size';
import pngcrush from '../index.js';

test('rebuild the pngcrush binaries', async t => {
	// Skip the test on Windows
	if (process.platform === 'win32') {
		t.pass();
		return;
	}

	const temporary = temporaryDirectory();
	const source = fileURLToPath(new URL('../vendor/source/pngcrush-1.8.13.tar.gz', import.meta.url));

	await binBuild.file(source, [
		`mkdir -p ${temporary}`,
		`make && mv pngcrush ${path.join(temporary, 'pngcrush')}`,
	]);

	t.true(fs.existsSync(path.join(temporary, 'pngcrush')));
});

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(pngcrush, ['-version']));
});

test('minify a PNG', async t => {
	const temporary = temporaryDirectory();
	const src = fileURLToPath(new URL('fixtures/test.png', import.meta.url));
	const dest = path.join(temporary, 'test.png');
	const args = [
		'--recompress',
		'--shrink-extra',
		src,
		dest,
	];

	await execa(pngcrush, args);
	const result = await compareSize(src, dest);

	t.true(result[dest] < result[src]);
});
