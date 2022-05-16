const { readdir, readFile, writeFile } = require('fs/promises');
const path = require('path');

const {
  SRC_FOLDER_STYLES,
  DEST_FOLDER,
  CSS_BUNDLE_NAME,
} = require('./constants');

async function compileCss() {
  const dirEntries = await readdir(path.join(__dirname, SRC_FOLDER_STYLES), {
    withFileTypes: true,
  });

  let cssBundle;

  await Promise.all(
    dirEntries
      .filter((dirEntry) => dirEntry.isFile())
      .filter((dirEntry) => dirEntry.name.endsWith('.css'))
      .map((dirEntry) => dirEntry.name)
      .map(async (fileName) => {
        const styleSheet = await readFile(
          path.join(__dirname, SRC_FOLDER_STYLES, fileName),
          { encoding: 'utf-8' }
        );

        cssBundle += styleSheet;
      })
  );

  await writeFile(
    path.join(__dirname, DEST_FOLDER, CSS_BUNDLE_NAME),
    cssBundle,
    { encoding: 'utf-8' }
  );
}

module.exports = {
  compileCss,
};
