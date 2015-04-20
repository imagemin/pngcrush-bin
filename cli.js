#!/usr/bin/env node
'use strict';

var spawn = require('child_process').spawn;
var pngcrush = require('./').path;
var input = process.argv.slice(2);

spawn(pngcrush, input, {stdio: 'inherit'})
	.on('exit', process.exit);
