const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { TokenERC20, ProposalSystem, VotingSystem } = require('./compile');

const provider = new HDWalletProvider(
	'moon hazard pear insect plastic grit moon wing seat squirrel wise buddy',
	'https://rinkeby.infura.io/Y5SWL6Wt4T6QOtimINcd'
);

const web3 = new Web3(provider);

const deploy = async () => {
	accounts = await web3.eth.getAccounts();
	console.log('Attempting to deploy from account', accounts[0]);

	const result = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: bytecode })
		.send({ gas: '1000000', from: accounts[0]});

	console.log(interface);
	console.log('Contract deployed to', result.options.address);
};
deploy();
