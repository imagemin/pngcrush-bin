# pngcrush-bin ![GitHub Actions Status](https://github.com/imagemin/pngcrush-bin/workflows/test/badge.svg?branch=master)

> [pngcrush](https://pmt.sourceforge.io/pngcrush/) is an optimizer which main purpose is to reduce the size of the PNG IDAT datastream by trying various compression levels an PNG filter methods

You probably want [`imagemin-pngcrush`](https://github.com/imagemin/imagemin-pngcrush) instead.


## Install

```
$ npm install --save pngcrush-bin
```


## Usage

```js
const {execFile} = require('child_process');
const pngcrush = require('pngcrush-bin');

execFile(pngcrush, ['-reduce', '-brute', 'input.png', 'output.png'], err => {
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

MIT © [Imagemin](https://github.com/imagemin)
