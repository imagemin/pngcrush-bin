#!/usr/bin/env node
'use strict';
const {spawn} = require('child_process');
const pngcrush = require('.');

const input = process.argv.slice(2);

spawn(pngcrush, input, {stdio: 'inherit'})
	.on('exit', process.exit);
