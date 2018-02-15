const path = require('path');
const fs = require('fs');
const solc = require('solc');

const tokenPath = path.resolve(__dirname, 'contracts', 'Token.sol');
const source = fs.readFileSync(tokenPath, 'utf8');

let compileString '';

async function compile() {
  compileString = await JSON.stringify(solc.compile(source, 1).contracts[':Token']);
  console.log(result);
  // expected output: "resolved"
}
compile();

fs.writeFile('contract', , (err) => {  
    if (err) throw err;
});

module.exports = solc.compile(source, 1).contracts[':Token'];