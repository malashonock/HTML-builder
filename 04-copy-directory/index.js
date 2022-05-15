const fs = require('fs');
const path = require('path');

const SRC_FOLDER = 'files';
const DEST_FOLDER = 'files-copy';

// Create destination folder, unless it already exists
fs.mkdir(
  path.join(__dirname, DEST_FOLDER),
  { recursive: true },
  (error, path) => {
    if (error) throw error;
    console.log(path ? `New folder created: ${path}` : 'Folder already exists');
  }
);

// Copy files from source folder to destination folder
fs.readdir(path.join(__dirname, SRC_FOLDER), (error, fileNames) => {
  if (error) throw error;
  fileNames.forEach((fileName) => {
    fs.copyFile(
      path.join(__dirname, SRC_FOLDER, fileName),
      path.join(__dirname, DEST_FOLDER, fileName),
      (error) => {
        if (error) throw error;
        console.log(
          `Copied/updated ${fileName} from ${SRC_FOLDER} to ${DEST_FOLDER}`
        );
      }
    );
  });
});
