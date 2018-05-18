const fs = require("fs");
const path = require("path");
const readlines = require("n-readlines");
const utilities = require("./utilities");
const args = require("args")
  .option("input", "Path to file")
  .option("output", "Path to output directory")
  .option("debug", "Include debug files with output", false);
const flags = args.parse(process.argv);

const flagCodes = ["001", "999"];
const filePath = path.resolve(flags.input);
const outputPath = flags.output
  ? path.resolve(flags.output)
  : path.resolve(path.dirname(filePath), "generated-eis-files");

//
//
// Validate path is valid

console.log("Input Path: ", `${flags.input} -> ${filePath}`);
console.log("Output Path: ", `${flags.output} -> ${outputPath}`);

if (utilities.fileExists(filePath)) {
  console.log(`File Found`);
} else {
  console.error("File Not Found");
  return;
}

utilities.folderExists(outputPath);

//
//
// Time to begin parsing
const liner = new readlines(filePath);
const logs = [];
const records = [];

var next;
var read = false;
var tmp = {
  data: [],
  name: ""
};

resetTmp();

console.log("Starting read...", liner.next());
while ((next = liner.next())) {
  const line = next.toString("ascii");
  const flag = isFlagged(line);

  logs.push(`PROCESS: ${line}`);

  // Check to start reading
  if (!read && flag) {
    read = true;
    logs.push(`READING TRUE: ${line}`);

    const name = getEisFileName(line);
    pushToTmp(line, name);

    continue;
  }

  if (read) {
    pushToTmp(line);
    logs.push(`TMP: ${line}`);
  }

  // Check to stop reading
  if (read && flag) {
    read = false;
    logs.push(`READING FALSE: ${tmp}`);

    records.push(tmp);
    createEisFile(tmp.data, tmp.name);
    resetTmp();
  }
}

if (flags.debug) {
  createDebugFiles();
}

//
//
// Helper Methods
function resetTmp() {
  tmp = {
    data: [],
    name: ""
  };
}

function pushToTmp(line, name) {
  tmp.data.push(line);

  if (name) {
    tmp.name = name;
  }
}

function isFlagged(line) {
  if (!line) {
    return false;
  }

  const code = line.substring(0, 3);

  if (!code) {
    return false;
  }

  for (let i = 0; i < flagCodes.length; i++) {
    if (flagCodes[i] === code) {
      return true;
    }
  }
  return false;
}

function getEisFileName(line) {
  if (!line) {
    return null;
  }
  const fullName = line.split(" ")[0].trim();
  const nameLength = 15;

  return fullName.substring(fullName.length - nameLength);
}

function createEisFile(records, name) {
  const data = records.join("\n");
  const filePath = path.resolve(outputPath, name);

  utilities.folderExists(filePath);
  const stream = fs.createWriteStream(filePath, { flag: "w" });
  stream.once("open", function(fd) {
    stream.write(data);
    stream.end();
  });
}

function createDebugFiles() {
  utilities.createDebugFile(path.resolve(outputPath, "output.json"), {
    results: records
  });
  utilities.createDebugFile(path.resolve(outputPath, "logs.json"), {
    logs: logs
  });
}
