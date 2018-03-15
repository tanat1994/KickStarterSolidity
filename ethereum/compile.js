//Idea: To create the script which are not run the solc and takes time(10secs+) everytime that we compile
const path = require('path');
const solc = require('solc');
const fs = require('fs-extra'); //Similar to normal fs but It improve some function

const buildPath = path.resolve(__dirname, 'build'); //Get into 'build' folder
fs.removeSync(buildPath); //Delete everything in 'build' folder in one command

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts; //Get only contract section

fs.ensureDirSync(buildPath); //Check if folder exists if not create the new one

//Write the contracts JSON to the file
for (let contract in output){
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':','') + '.json'),
    output[contract] //Get in to each contract ?
  );
}
