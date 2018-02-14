const path = require('path');
const fs = require('fs');
const solc = require('solc');

const votingSystemPath = path.resolve(__dirname, 'contracts', 'VotingSystem.sol');
const source = fs.readFileSync(votingSystemPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':VotingSystem'];