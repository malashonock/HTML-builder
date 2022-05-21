const fs = require('fs');
const path = require('path');

const SRC_FOLDER = 'styles';
const DEST_FOLDER = 'project-dist';
const DEST_FILE = 'bundle.css';

const ws = fs.createWriteStream(path.join(__dirname, DEST_FOLDER, DEST_FILE));

fs.readdir(
  path.join(__dirname, SRC_FOLDER),
  { withFileTypes: true },
  (error, dirEntries) => {
    if (error) throw error;

    dirEntries
      .filter((dirEntry) => dirEntry.isFile())
      .filter((dirEntry) => dirEntry.name.endsWith('.css'))
      .forEach((dirEntry) => {
        const rs = fs.createReadStream(
          path.join(__dirname, SRC_FOLDER, dirEntry.name)
        );
        rs.pipe(ws);
      });
  }
);
