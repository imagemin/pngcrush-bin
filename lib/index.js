import fs from 'node:fs';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import BinWrapper from 'bin-wrapper';

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)));
const url = `https://raw.githubusercontent.com/imagemin/pngcrush-bin/v${pkg.version}/vendor/`;

const binWrapper = new BinWrapper()
	.src(`${url}osx/pngcrush`, 'darwin')
	.src(`${url}linux/pngcrush`, 'linux')
	.src(`${url}win/x64/pngcrush.exe`, 'win32', 'x64')
	.src(`${url}win/x86/pngcrush.exe`, 'win32', 'x86')
	.dest(fileURLToPath(new URL('../vendor', import.meta.url)))
	.use(process.platform === 'win32' ? 'pngcrush.exe' : 'pngcrush');

export default binWrapper;
