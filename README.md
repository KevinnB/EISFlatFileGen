# EIS Flat File Generator

This is a helper project that will assist in creating flat files for ingestion from a single file. This will increase the speed at which flat files can be generated to increase testing capabilities.

## System Requirements

* Nodejs
* Yarn Package Manager (Optional)

## Installation

### npm

```
git clone [https://github.com/KevinnB/EISFlatFileGen.git](https://github.com/KevinnB/EISFlatFileGen.git)
cd EISFlatFileGen
npm install
```

### yarn

```
git clone [https://github.com/KevinnB/EISFlatFileGen.git](https://github.com/KevinnB/EISFlatFileGen.git)
cd EISFlatFileGen
yarn install
```

## Example Usage

You can either run the start script specified in the package.json file or you can explicitly call index.js via nodejs.

### npm

```
npm run start --input "C:\Users\TestUser\inputFile.txt" --output "C:\Users\TestUser\output-folder"
```

### yarn

```
yarn start --input "C:\Users\TestUser\inputFile.txt" --output "C:\Users\TestUser\output-folder"
```

## Advanced Usage

* help \* List of avaliable commands
* version \* Displays current version of the package
* input \* Specifies the input file
* output \* Path to output directory (defaults to "./output")
* debug \* Flag tells the app to generate two additional files along with the output. These can be useful if debugging issues.
