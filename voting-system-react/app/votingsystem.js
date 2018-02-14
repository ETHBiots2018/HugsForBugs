import web3 from './web3';

const address = '0xbA61965126fE840d473D5c8A74d3b23C50dE4d07';

const abi = [
	{
		"constant":false,
		"inputs":[{"name":"index","type":"uint256"}],
		"name":"enterVoting",
		"outputs":[],
		"payable":true,
		"stateMutability":"payable",
		"type":"function"
	},
	{
		"constant":false,
		"inputs":[{"name":"title","type":"string"},{"name":"description","type":"string"},{"name":"minimum","type":"uint256"}],
		"name":"createVoting","outputs":[],
		"payable":false,
		"stateMutability":"nonpayable",
		"type":"function"
	},
	{
		"constant":true,
		"inputs":[{"name":"index","type":"uint256"}],
		"name":"getVotingTitle",
		"outputs":[{"name":"","type":"string"}],
		"payable":false,
		"stateMutability":"view",
		"type":"function"
	},
	{
		"constant":true,
		"inputs":[{"name":"","type":"uint256"}],
		"name":"votings",
		"outputs":[{"name":"title","type":"string"},{"name":"description","type":"string"},{"name":"minimumContribution","type":"uint256"},{"name":"complete","type":"bool"},{"name":"approvalCount","type":"uint256"},{"name":"rejectionCount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"},{"name":"value","type":"bool"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

export default new web3.eth.Contract(abi, address);
