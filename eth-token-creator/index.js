const Web3 = require('web3');
const path = require('path');
const fs = require('fs');
const solc = require('solc');

// setting providers
exports.setProvider = function(provider) {
	exports.provider = provider;
}

exports.compile = async function() {
	const tokenPath = path.resolve(__dirname, 'contracts', 'Token.sol');
	const source = fs.readFileSync(tokenPath, 'utf8');
	const result = await solc.compile(source, 1).contracts[':Token'];
	exports.interface = result.interface;
	exports.bytecode = result.bytecode;
	return { interface: result.interface, bytecode: result.bytecode };
}

exports.deploy = async function({ name, symbol, initialSupply, gas  }) {
	const web3 = new Web3(exports.provider);
	accounts = await web3.eth.getAccounts();

	const result = await new web3.eth.Contract(JSON.parse(exports.interface)).deploy({ data: exports.bytecode, arguments: [initialSupply, name, symbol] }).send({ gas, from: accounts[0]});
	const address = result.options.address;
	const token = new web3.eth.Contract(JSON.parse(exports.interface), result.options.address);

	exports.address = address;
	exports.token = token;
	return token;
}
