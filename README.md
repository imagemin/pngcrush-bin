# pngcrush-bin [![Build Status](http://img.shields.io/travis/imagemin/pngcrush-bin.svg?style=flat)](https://travis-ci.org/imagemin/pngcrush-bin)

> pngcrush is an optimizer which main purpose is to reduce the size of the PNG IDAT datastream by trying various compression levels an PNG filter methods


## Install

```sh
$ npm install --save pngcrush-bin
```


## Usage

```js
var execFile = require('child_process').execFile;
var pngcrush = require('pngcrush-bin').path;

execFile(pngcrush, ['-reduce', '-brute', 'input.png', 'output.png'], function (err) {
	if (err) {
		throw err;
	}

	console.log('Image minified');
});
```


## CLI

```sh
$ npm install --global pngcrush-bin
```

```sh
$ pngcrush --help
```


## License

MIT © [imagemin](https://github.com/imagemin)
