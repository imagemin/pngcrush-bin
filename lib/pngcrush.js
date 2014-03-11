'use strict';

var Bin = require('bin-wrapper');
var path = require('path');

var options = {
  name: 'pngcrush',
  bin: 'pngcrush',
  path: path.join(__dirname, '../vendor'),
  url: 'https://raw.github.com/1000ch/node-pngcrush-bin/master/vendor/pngcrush',
  src: 'http://downloads.sourceforge.net/project/pmt/pngcrush/1.7.72/pngcrush-1.7.72.zip',
  buildScript: 'make && mv ./pngcrush ' + path.join(__dirname, '../vendor'),
  platform: {
    osx: {
      url: 'https://raw.github.com/1000ch/node-pngcrush-bin/master/vendor/osx/pngcrush'
    },
    linux: {
      url: 'https://raw.github.com/1000ch/node-pngcrush-bin/master/vendor/linux/x86/pngcrush'
    }
  }
};
var bin = new Bin(options);

exports.bin = bin;
exports.options = options;
exports.path = bin.path;