# [pngcrush-bin](https://npmjs.org/package/pngcrush-bin) [![Build Status](http://img.shields.io/travis/imagemin/pngcrush-bin.svg?style=flat)](https://travis-ci.org/imagemin/pngcrush-bin) [![Build status](https://ci.appveyor.com/api/projects/status/cbnmru7q2hm2sk14)](https://ci.appveyor.com/project/ShinnosukeWatanabe/pngcrush-bin)

[pngcrush](http://pmt.sourceforge.net/pngcrush/) Node.js wrapper that optimize PNG images.

> Pngcrush is an optimizer for PNG (Portable Network Graphics) files. It can be run from a commandline in an MSDOS window, or from a UNIX or LINUX commandline.
> Its main purpose is to reduce the size of the PNG IDAT datastream by trying various compression levels an PNG filter methods. It also can be used to remove unwanted ancillary chunks, or to add certain chunks including gAMA, tRNS, iCCP, and textual chunks.

## Install

```sh
$ npm install --save pngcrush-bin
```

## Usage

```js
var execFile = require('child_process').execFile;
var pngcrush = require('pngcrush-bin').path;

execFile(pngcrush, ['-reduce', '-brute', 'input.png', 'output.png'], function (error) {
  if (error) {
    throw error;
  }

  console.log('Image minified');
});
```

## License

MIT © [imagemin](https://github.com/imagemin)
