'use strict';

var Bin = require('bin-wrapper');
var path = require('path');

var options = {
  name: 'pngcrush',
  bin: 'pngcrush',
  path: path.join(__dirname, '../vendor'),
  src: 'http://downloads.sourceforge.net/project/pmt/pngcrush/1.7.70/pngcrush-1.7.70.tar.gz',
  buildScript: './configure --with-system-zlib --bindir="' + path.join(__dirname, '../vendor') + '" && ' +
    'make install',
  platform: {
    darwin: {
      url: 'https://raw.github.com/1000ch/node-pngcrush-bin/0.3.1/vendor/osx/optipng'
    },
    freebsd: {
      url: 'https://raw.github.com/1000ch/node-pngcrush-bin/0.3.1/vendor/freebsd/optipng'
    },
    linux: {
      url: 'https://raw.github.com/1000ch/node-pngcrush-bin/0.3.1/vendor/linux/x86/optipng',
      arch: {
        x64: {
          url: 'https://raw.github.com/1000ch/node-pngcrush-bin/0.3.1/vendor/linux/x64/optipng'
        }
      }
    }
  }
};
var bin = new Bin(options);

exports.bin = bin;
exports.options = options;
exports.path = bin.path;