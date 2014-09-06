/*global afterEach, beforeEach, describe, it */
'use strict';

var assert = require('assert');
var binCheck = require('bin-check');
var BinBuild = require('bin-build');
var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');
var rm = require('rimraf');

var binPath = require('../').path;
var binVersion = require('../lib').v;

describe('pngcrush()', function () {
  afterEach(function (cb) {
    rm(path.join(__dirname, 'tmp'), cb);
  });

  beforeEach(function () {
    fs.mkdirSync(path.join(__dirname, 'tmp'));
  });

  it('should rebuild the pngcrush binaries', function (cb) {
    var tmp = path.join(__dirname, 'tmp');
    var builder = new BinBuild()
      .src('http://downloads.sourceforge.net/project/pmt/pngcrush/' + binVersion + '/pngcrush-' + binVersion + '.zip')
      .cmd('make && mv ./pngcrush ' + path.join(tmp, 'pngcrush'));

    builder.build(function (err) {
      if (err) {
        return cb(err);
      }
      assert(fs.existsSync(path.join(tmp, 'pngcrush')));
      cb();
    });
  });

  it('should return path to binary and verify that it is working', function (cb) {
    var args = [
      '-reduce',
      '-brute',
      path.join(__dirname, 'fixtures/test.png'),
      path.join(__dirname, 'tmp/test.png')
    ];

    binCheck(binPath, args, function (err, works) {
      if (err) {
        return cb(err);
      }
      assert.equal(works, true);
      cb();
    });
  });

  it('should minify a PNG', function (cb) {
    var args = [
      '--recompress',
      '--shrink-extra',
      path.join(__dirname, 'fixtures/test.png'),
      path.join(__dirname, 'tmp/test.png')
    ];

    execFile(binPath, args, function (err) {
      if (err) {
        return cb(err);
      }

      var src = fs.statSync(path.join(__dirname, 'fixtures/test.png')).size;
      var dest = fs.statSync(path.join(__dirname, 'tmp/test.png')).size;

      assert(dest < src);
      cb();
    });
  });
});
