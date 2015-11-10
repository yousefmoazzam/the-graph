/**
 * Created by twi18192 on 29/10/15.
 */

var browserify = require('browserify');
var moduleify = require('moduleify');
var b = browserify();

b.transform(moduleify({
    "./the-graph-edited.js": 'TheGraph',
    "./the-graph-app-edited.js": "TheGraphApp"
}));

b.add('./getAllJavascriptFiles.js');
b.bundle().pipe(require('fs').createWriteStream('moduleifyBundle.js'));