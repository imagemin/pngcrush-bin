# pngcrush-bin [![Build Status](http://img.shields.io/travis/imagemin/pngcrush-bin.svg?style=flat)](https://travis-ci.org/imagemin/pngcrush-bin)

> pngcrush is an optimizer which main purpose is to reduce the size of the PNG IDAT datastream by trying various compression levels an PNG filter methods


## Install

```
$ npm install --save pngcrush-bin
```


## Usage

```js
var execFile = require('child_process').execFile;
var pngcrush = require('pngcrush-bin');

execFile(pngcrush, ['-reduce', '-brute', 'input.png', 'output.png'], function (err) {
	console.log('Image minified');
});
```


## CLI

```
$ npm install --global pngcrush-bin
```

```
$ pngcrush --help
```


## License

MIT © [imagemin](https://github.com/imagemin)
