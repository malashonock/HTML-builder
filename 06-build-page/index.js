const path = require('path');
const {
  readdir,
  mkdir,
  readFile,
  writeFile,
  copyFile,
} = require('fs/promises');

const HTML_TEMPLATE_NAME = 'template.html';
const HTML_BUNDLE_NAME = 'index.html';
const CSS_BUNDLE_NAME = 'style.css';
const SRC_FOLDER_STYLES = 'styles';
const SRC_FOLDER_ASSETS = 'assets';
const SRC_FOLDER_COMPONENTS = 'components';
const DEST_FOLDER = 'project-dist';
const DEST_SUBFOLDER_ASSETS = SRC_FOLDER_ASSETS;

async function createDistFolder() {
  await mkdir(path.join(__dirname, DEST_FOLDER), {
    recursive: true,
  });
}

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

async function compileCss() {
  const dirEntries = await readdir(path.join(__dirname, SRC_FOLDER_STYLES), {
    withFileTypes: true,
  });

  let cssBundle = '';

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

async function copyAssets(
  srcFolder = path.join(__dirname, SRC_FOLDER_ASSETS),
  destFolder = path.join(__dirname, DEST_FOLDER, DEST_SUBFOLDER_ASSETS)
) {
  const dirEntries = await readdir(srcFolder, { withFileTypes: true });

  dirEntries.forEach(async (dirEntry) => {
    if (dirEntry.isFile()) {
      const fileName = dirEntry.name;

      await copyFile(
        path.join(srcFolder, fileName),
        path.join(destFolder, fileName)
      );
    }

    if (dirEntry.isDirectory()) {
      const nestedFolder = dirEntry.name;

      // Create folder in destination directory
      await mkdir(path.join(destFolder, nestedFolder), { recursive: true });

      // Recursively, copy files from this folder
      return copyAssets(
        path.join(srcFolder, nestedFolder),
        path.join(destFolder, nestedFolder)
      );
    }
  });
}

async function main() {
  createDistFolder();
  compileHtml();
  compileCss();
  copyAssets();
}

// Run the program
main();
