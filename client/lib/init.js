console.log("read init.js");

web3 = new Web3();

if(!web3.currentProvider)
	web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

EthAccounts.init();
EthBlocks.init();
