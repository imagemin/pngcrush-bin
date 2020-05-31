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
	const temporary = tempy.directory();

	await binBuild.file(path.resolve(__dirname, '../vendor/source/pngcrush-1.8.13.tar.gz'), [
		`mkdir -p ${temporary}`,
		`make && mv pngcrush ${path.join(temporary, 'pngcrush')}`
	]);

	t.true(fs.existsSync(path.join(temporary, 'pngcrush')));
});

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(pngcrush, ['-version']));
});

test('minify a PNG', async t => {
	const temporary = tempy.directory();
	const src = path.join(__dirname, 'fixtures/test.png');
	const dest = path.join(temporary, 'test.png');
	const args = [
		'--recompress',
		'--shrink-extra',
		src,
		dest
	];

	await execa(pngcrush, args);
	const result = await compareSize(src, dest);

	t.true(result[dest] < result[src]);
});
