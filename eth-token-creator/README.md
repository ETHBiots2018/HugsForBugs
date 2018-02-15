# eth-token-creator

From Hackaton: [BIOTS2018](http://biots.org/)

### Installation

Run: `npm install --save eth-token-creator`

#### Usage

This module comes with a few functions to create a configurable and standardized ERC20 Token.

```javascript
const etc = require('eth-token-creator');

// basic example with async await for deploying token on blockchain
async function deployContract(provider) {

	// 1. update Token.sol and compile abi and bytecode
	await etc.compile();

	// 2. set provider for web3 module
	etc.setProvider(provider);

	// 3. deploy contract and return address
	return await etc.deploy({ name: 'VoteCoint', symbol: 'VTC', initialSupply: 1000, gas: '1000000' });
}

const { address, token } = deployContract();
```

 -  returned value `address` is a BigNumber Object
 - returned value `token` is a web3 wrapper for the contract



