'use strict';
const fs = require('fs');
const path = require('path');
const test = require('ava');
const execa = require('execa');
const tempy = require('tempy');
const binCheck = require('bin-check');
const BinBuild = require('bin-build');
const compareSize = require('compare-size');
const pngcrush = require('..');

test.cb('rebuild the pngcrush binaries', t => {
	const tmp = tempy.directory();

	new BinBuild()
		.src('https://downloads.sourceforge.net/project/pmt/pngcrush/1.8.10/pngcrush-1.8.10.zip')
		.cmd(`mkdir -p ${tmp}`)
		.cmd('make && mv pngcrush ' + path.join(tmp, 'pngcrush'))
		.run(err => {
			t.ifError(err);
			t.true(fs.existsSync(path.join(tmp, 'pngcrush')));
			t.end();
		});
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
