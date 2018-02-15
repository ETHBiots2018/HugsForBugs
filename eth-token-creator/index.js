"use strict";

module.exports = {
	name: '', 
	symbol: '', 
	initialSupply: 0, 
	decimals: 18,
	provider: null,
	create: (config, callback) => {
		if (config.name == null) callback('Please define a name for your token in your configuration.');
		else name = config.name;

		if (config.symbol == null) callback('Please define a symbol for your token in your configuration.');
		else symbol = config.symbol;

		if (config.initialSupply == null) callback('Please a initial supply for your token in your configuration.');
		else initialSupply = config.initialSupply;
				
		decimals = config.decimals;
		return this;
	}, 
	setProvider: (provider, callback) => {

	}, 
	compile: () => {

	}, 
	deploy: () => {

	}

}