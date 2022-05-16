const { readdir, mkdir, copyFile } = require('fs/promises');
const path = require('path');

const {
  SRC_FOLDER_ASSETS,
  DEST_FOLDER,
  DEST_SUBFOLDER_ASSETS,
} = require('./constants');

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

module.exports = {
  copyAssets,
};
