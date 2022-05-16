const { mkdir } = require('fs/promises');
const path = require('path');

const { DEST_FOLDER } = require('./constants');

async function createDistFolder() {
  await mkdir(path.join(__dirname, DEST_FOLDER), {
    recursive: true,
  });
}

module.exports = {
  createDistFolder,
};
