const { rm, mkdir, readdir, copyFile } = require('fs/promises');
const path = require('path');

const SRC_FOLDER = 'files';
const DEST_FOLDER = 'files-copy';

async function removeDestFolder() {
  // Delete destination folder with all its contents
  await rm(path.join(__dirname, DEST_FOLDER), {
    recursive: true,
    force: true,
  });
}

// Create destination folder, unless it already exists
async function createDestFolder() {
  await mkdir(
    path.join(__dirname, DEST_FOLDER),
    { recursive: true } // now this is redundant, but still
  );
}

// Copy files from source folder to destination folder
async function copyFiles() {
  const fileNames = await readdir(path.join(__dirname, SRC_FOLDER));

  fileNames.forEach(async (fileName) => {
    await copyFile(
      path.join(__dirname, SRC_FOLDER, fileName),
      path.join(__dirname, DEST_FOLDER, fileName)
    );
  });
}

async function main() {
  await removeDestFolder();
  await createDestFolder();
  await copyFiles();
}

// Run the program
main();
