import web3 from './web3';

const address = '0xbA61965126fE840d473D5c8A74d3b23C50dE4d07';

const abi = [
	{
		"constant":true,
		"inputs":[],
		"name":"manager",
		"outputs":[{"name":"","type":"address"}],
		"payable":false,
		"stateMutability":"view",
		"type":"function"
	},
	{
		"constant":false,
		"inputs":[],
		"name":"pickWinner",
		"outputs":[],
		"payable":false,
		"stateMutability":"nonpayable",
		"type":"function"
	},
	{
		"constant":true,
		"inputs":[],
		"name":"getPlayers",
		"outputs":[{"name":"","type":"address[]"}],
		"payable":false,
		"stateMutability":"view",
		"type":"function"
	},{
		"constant":false,
		"inputs":[],
		"name":"enter",
		"outputs":[],
		"payable":true,
		"stateMutability":"payable",
		"type":"function"
	},{
		"constant":true,
		"inputs":[{"name":"","type":"uint256"}],
		"name":"players",
		"outputs":[{"name":"","type":"address"}],
		"payable":false,
		"stateMutability":"view",
		"type":"function"
	},{
		"inputs":[],
		"payable":true,
		"stateMutability":"payable",
		"type":"constructor"
	}
];

export default new web3.eth.Contract(abi, address);
