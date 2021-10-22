#!/usr/bin/env node
import {spawn} from 'node:child_process';
import process from 'node:process';
import pngcrush from './index.js';

const input = process.argv.slice(2);

spawn(pngcrush, input, {stdio: 'inherit'})
	.on('exit', process.exit);
