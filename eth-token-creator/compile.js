const path = require('path');
const fs = require('fs');
const solc = require('solc');

const tokenPath = path.resolve(__dirname, 'contracts', 'Token.sol');
const source = fs.readFileSync(tokenPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Token'];