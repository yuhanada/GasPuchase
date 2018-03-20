import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

// GasPurchase.sol ContractAddress
ContractAddress="0x1f9bd98fab640b6de1ae59c2884f0b2a6aee0513";
// GasPurchase.sol abiArray
abiArray=[{"constant":false,"inputs":[],"name":"allreset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"b","type":"uint256"}],"name":"getPumpAccount","outputs":[{"name":"a","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"b","type":"uint256"}],"name":"getDepositAmount","outputs":[{"name":"a","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_carAcc","type":"address"},{"name":"_gasAmount","type":"uint256"},{"name":"_billAmount","type":"uint256"}],"name":"depositChange","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_gasPrice","type":"uint256"}],"name":"changeGasPrice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawChange","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"b","type":"uint256"}],"name":"getChangeAmount","outputs":[{"name":"a","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"b","type":"uint256"}],"name":"getCarAccount","outputs":[{"name":"a","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"b","type":"uint256"}],"name":"getGasAmount","outputs":[{"name":"a","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"b","type":"uint256"}],"name":"getGasPrice","outputs":[{"name":"a","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"b","type":"uint256"}],"name":"getBillAmount","outputs":[{"name":"a","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_pumpAcc","type":"address"}],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}];
//GasPurchase.sol's binary
binary="60606040526000600160146101000a81548160ff0219169083151502179055506000600160156101000a81548160ff021916908315150217905550341561004557600080fd5b610252806100546000396000f300606060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806351c1f50c1461005c578063971206a41461009e578063e95336c7146100d5575b600080fd5b341561006757600080fd5b61007d60048080359060200190919050506101ab565b60405180838152602001821515151581526020019250505060405180910390f35b34156100a957600080fd5b6100bf60048080359060200190919050506101f4565b6040518082815260200191505060405180910390f35b34156100e057600080fd5b61012b600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610207565b604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182151515158152602001935050505060405180910390f35b60008060011515600160149054906101000a900460ff16151514156101e257826002819055506001905060025481915091506101ef565b6000905060025481915091505b915091565b6000816003819055506003549050919050565b60008060008492508391506001905082828292509250925092509250925600a165627a7a723058200fac5e4c629190ea0feafe54688db07b05035052d6647cc1126615763b3f585e0029";


Session.setDefault("gasprice",1);


var getCurrentGasPrice = function(){
  var myContract = web3.eth.contract(abiArray).at(ContractAddress);
  	
  myContract.getGasPrice(1, function(err, result){
    if(!err){
      console.log("sucsess:"+result);
      var tempGasPrice = "_"+result;
      Session.set("gasprice", tempGasPrice.substr(1));
    }else{
      console.log(err);
    }
  });
}
getCurrentGasPrice();

Template.chengeGasPrice.helpers({
  gasprice:function() {
    return Session.get("gasprice");
  },
});

Template.chengeGasPrice.events({
  'click #enterBtn'(event, instance) {
    //Session.set("gasprice", document.getElementById("gasprice").value);
    changeGasPrice();
  },
});

var changeGasPrice = function(){
	console.log("changeGasPrice");
	var txObject = {
    //value: document.getElementById("gasprice").value,
    //gas: 300000,
    from: web3.eth.accounts[0]
    //to: web3.eth.accounts[0]
  };

  var myContract = web3.eth.contract(abiArray).at(ContractAddress);
  
  var tempGasPrice = document.getElementById("gasprice").value;
  console.log(tempGasPrice);
	myContract.changeGasPrice.sendTransaction(tempGasPrice, txObject, function(err, result){
    if(!err){
	    console.log("succsecc:"+result);
      var timer;
      clearInterval(timer);
      timer = setInterval(function(){
        console.log("changing gas price...");
        var receipt = web3.eth.getTransactionReceipt(result);
        if (receipt) {
          clearInterval(timer);
          console.log(receipt);
          getCurrentGasPrice();
        }
      }, 1000);
    } else {
      console.log("err"+err);
      done();
    }
  });
}
