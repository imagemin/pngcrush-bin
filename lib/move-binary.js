'use strict';

var bin = require('./');
var fs = require('fs');

fs.renameSync(bin.use(), bin.path());
