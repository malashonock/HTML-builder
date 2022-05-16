const { createDistFolder } = require('./create-dist-folder');
const { compileHtml } = require('./compile-html');
const { compileCss } = require('./compile-css');
const { copyAssets } = require('./copy-assets');

createDistFolder();
compileHtml();
compileCss();
copyAssets();
