const path = require('path');
const fs = require('fs');
const solc = require('solc');

const votingSystemPath = path.resolve(__dirname, 'contracts', 'VotingSystem.sol');
const votingSystemSource = fs.readFileSync(votingSystemPath, 'utf8');

const proposalSystemPath = path.resolve(__dirname, 'contracts', 'ProposalSystem.sol');
const proposalSystemSource = fs.readFileSync(proposalSystemPath, 'utf8');

const tokenERC20Path = path.resolve(__dirname, 'contracts', 'TokenERC20.sol');
const tokenERC20Source = fs.readFileSync(tokenERC20Path, 'utf8');

var input = {
    'VotingSystem.sol': votingSystemSource,
    'ProposalSystem.sol': proposalSystemSource, 
    'TokenERC20.sol': tokenERC20Source
}
var output = solc.compile({ sources: input }, 1);
module.exports.VotingSystem = output.contracts[':VotingSystem'];
module.exports.ProposalSystem = output.contracts[':ProposalSystem'];
module.exports.TokenERC20 = output.contracts[':TokenERC20'];