'use strict';

var path = require('path');
var BinWrapper = require('bin-wrapper');
var pkg = require('../package.json');
var url = 'https://raw.githubusercontent.com/imagemin/pngcrush-bin/v' + pkg.version + '/vendor/';

module.exports = new BinWrapper()
	.src(url + 'osx/pngcrush', 'darwin')
	.src(url + 'linux/pngcrush', 'linux')
	.src(url + 'win/x64/pngcrush.exe', 'win32', 'x64')
	.src(url + 'win/x86/pngcrush.exe', 'win32', 'x86')
	.dest(path.join(__dirname, '../vendor'))
	.use(process.platform === 'win32' ? 'pngcrush.exe' : 'pngcrush');
