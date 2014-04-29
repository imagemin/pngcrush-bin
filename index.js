'use strict';

var BinBuild = require('bin-build');
var BinWrapper = require('bin-wrapper');
var chalk = require('chalk');
var fs = require('fs');
var path = require('path');

/**
 * Initialize a new BinWrapper
 */

var bin = new BinWrapper()
  .src('https://raw.github.com/1000ch/node-pngcrush-bin/master/vendor/osx/pngcrush', 'darwin')
  .src('https://raw.github.com/1000ch/node-pngcrush-bin/master/vendor/linux/pngcrush', 'linux')
  .dest(path.join(__dirname, 'vendor'))
  .use('pngcrush');

/**
 * Only run check if binary doesn't already exist
 */

fs.exists(bin.use(), function (exists) {
  if (!exists) {
    var args = [
      '-reduce',
      '-brute',
      path.join(__dirname, 'test/fixtures/test.png'),
      path.join(__dirname, 'test/fixtures/test-optimized.png')
    ];

    bin.run(args, function (err) {
      if (err) {
        console.log(chalk.red('✗ pre-build test failed, compiling from source...'));

        var builder = new BinBuild()
          .src('http://downloads.sourceforge.net/project/pmt/pngcrush/1.7.73/pngcrush-1.7.73.zip')
          .make('make && mkdir ' + bin.dest() + ' && mv ./pngcrush ' + bin.use());

        return builder.build(function (err) {
          if (err) {
            return console.log(chalk.red('✗ ' + err));
          }

          console.log(chalk.green('✓ pngcrush built successfully'));
        });
      }

      console.log(chalk.green('✓ pre-build test passed successfully'));
    });
  }
});

/**
 * Module exports
 */

module.exports.path = bin.use();
