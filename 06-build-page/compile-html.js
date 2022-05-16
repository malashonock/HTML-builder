const { readFile, writeFile } = require('fs/promises');
const path = require('path');

const {
  HTML_TEMPLATE_NAME,
  SRC_FOLDER_COMPONENTS,
  DEST_FOLDER,
  HTML_BUNDLE_NAME,
} = require('./constants');

async function compileHtml() {
  const htmlTemplate = await readFile(
    path.join(__dirname, HTML_TEMPLATE_NAME),
    { encoding: 'utf-8' }
  );

  let htmlBundle = htmlTemplate;

  // Capture all component entries
  const regex = /\{\{(.+)\}\}/g;
  const componentEntries = [...htmlTemplate.matchAll(regex)];

  // Inject component code
  await Promise.all(
    componentEntries.map(async (match) => {
      const placeholder = match[0];
      const componentFileName = match[1] + '.html';

      // Read component source code
      const componentHtml = await readFile(
        path.join(__dirname, SRC_FOLDER_COMPONENTS, componentFileName),
        'utf-8'
      );

      // Replace placeholder with component code
      htmlBundle = htmlBundle.replace(placeholder, componentHtml);
    })
  );

  await writeFile(
    path.join(__dirname, DEST_FOLDER, HTML_BUNDLE_NAME),
    htmlBundle,
    { encoding: 'utf-8' }
  );
}

module.exports = {
  compileHtml,
};
