const { createDistFolder } = require('./create-dist-folder');
const { compileHtml } = require('./compile-html');
const { compileCss } = require('./compile-css');

createDistFolder();
compileHtml();
compileCss();
