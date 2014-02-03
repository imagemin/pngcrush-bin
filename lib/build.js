'use strict';

var bin = require('./pngcrush').bin;
var chalk = require('chalk');

bin.build(function (error) {
  if (error) {
    return console.log(chalk.red('✗ ' + error.message));
  }

  console.log(chalk.green('✓ pngcrush built successfully'));
});