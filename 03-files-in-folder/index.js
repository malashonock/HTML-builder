const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (error, dirEntries) => {
  dirEntries
    .filter((dirEntry) => dirEntry.isFile())
    .map((fileEntry) => fileEntry.name)
    .forEach((fileFullName) => {
      // Parse full file name
      const parsedFileName = path.parse(fileFullName);
      const fileName = parsedFileName.name;
      const fileExt = parsedFileName.ext.replace(/^\./, '');

      // Get file size and output to console
      const filePath = path.join(folderPath, fileFullName);
      fs.stat(filePath, (error, stats) => {
        console.log(`${fileName} - ${fileExt} - ${stats.size}b`);
      });
    });
});
