const fs = require("fs");
const path = require("path");

// Public
function logError(message) {
  console.error(`ERROR: ${message}`);
}

function fileExists(filePath) {
  console.log(`Checking file exists...`);
  if (!filePath) {
    logError("Could not find path");
    return;
  }

  return fs.existsSync(path.resolve(filePath));
}

function folderExists(filePath) {
  const folder = path.dirname(filePath);

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
}

function createDebugFile(filePath, data, callback) {
  folderExists(filePath);

  return fs.writeFile(
    filePath,
    JSON.stringify(data),
    { flag: "w" },
    handleFileWriteError
  );
}

// Private
function handleFileWriteError(error) {
  logError(error);
}

// Exports
exports.logError = logError;
exports.fileExists = fileExists;
exports.folderExists = folderExists;
exports.createDebugFile = createDebugFile;
