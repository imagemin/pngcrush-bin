'use strict';
const fs = require('fs');
const path = require('path');
const test = require('ava');
const execa = require('execa');
const tempy = require('tempy');
const binCheck = require('bin-check');
const binBuild = require('bin-build');
const compareSize = require('compare-size');
const pngcrush = require('..');

test('rebuild the pngcrush binaries', async t => {
	const tmp = tempy.directory();

	await binBuild.url('https://downloads.sourceforge.net/project/pmt/pngcrush/1.8.13/pngcrush-1.8.13.zip', [
		`mkdir -p ${tmp}`,
		`make && mv pngcrush ${path.join(tmp, 'pngcrush')}`
	]);

	t.true(fs.existsSync(path.join(tmp, 'pngcrush')));
});

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(pngcrush, ['-version']));
});

test('minify a PNG', async t => {
	const tmp = tempy.directory();
	const src = path.join(__dirname, 'fixtures/test.png');
	const dest = path.join(tmp, 'test.png');
	const args = [
		'--recompress',
		'--shrink-extra',
		src,
		dest
	];

	await execa(pngcrush, args);
	const res = await compareSize(src, dest);

	t.true(res[dest] < res[src]);
});
