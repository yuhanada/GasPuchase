import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

// GasPurchase.sol ContractAddress

ContractAddress="0x1f9bd98fab640b6de1ae59c2884f0b2a6aee0513";

// GasPurchase.sol abiArray

abiArray=[{"constant":false,"inputs":[],"name":"allreset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"b","type":"uint256"}],"name":"getPumpAccount","outputs":[{"name":"a","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"b","type":"uint256"}],"name":"getDepositAmount","outputs":[{"name":"a","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_carAcc","type":"address"},{"name":"_gasAmount","type":"uint256"},{"name":"_billAmount","type":"uint256"}],"name":"depositChange","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_gasPrice","type":"uint256"}],"name":"changeGasPrice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawChange","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"b","type":"uint256"}],"name":"getChangeAmount","outputs":[{"name":"a","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"b","type":"uint256"}],"name":"getCarAccount","outputs":[{"name":"a","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"b","type":"uint256"}],"name":"getGasAmount","outputs":[{"name":"a","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"b","type":"uint256"}],"name":"getGasPrice","outputs":[{"name":"a","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"b","type":"uint256"}],"name":"getBillAmount","outputs":[{"name":"a","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_pumpAcc","type":"address"}],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}];

//GasPurchase.sol's binary

binary="60606040526000600160146101000a81548160ff0219169083151502179055506000600160156101000a81548160ff021916908315150217905550341561004557600080fd5b610252806100546000396000f300606060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806351c1f50c1461005c578063971206a41461009e578063e95336c7146100d5575b600080fd5b341561006757600080fd5b61007d60048080359060200190919050506101ab565b60405180838152602001821515151581526020019250505060405180910390f35b34156100a957600080fd5b6100bf60048080359060200190919050506101f4565b6040518082815260200191505060405180910390f35b34156100e057600080fd5b61012b600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610207565b604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182151515158152602001935050505060405180910390f35b60008060011515600160149054906101000a900460ff16151514156101e257826002819055506001905060025481915091506101ef565b6000905060025481915091505b915091565b6000816003819055506003549050919050565b60008060008492508391506001905082828292509250925092509250925600a165627a7a723058200fac5e4c629190ea0feafe54688db07b05035052d6647cc1126615763b3f585e0029";


Template.carinformation.helpers({
  accountNo:function() {
    return web3.eth.accounts[0];
  }, cryptocurrency: function() {
    return web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]), 'ether');
  },

});

Session.setDefault("state","Idel"); //Idel, Auth, Refuel, Finish
Template.refuelstate.helpers({
  state: function() {
    return Session.get("state");
  },
});

Template.authentication.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});


Template.authentication.helpers({
  
});

Session.setDefault("pumpacc", null);
Session.setDefault("deposit", null);
Template.authentication.events({
  'click #authBtn'(event, instance) {
    console.log("click Enter Btn");
    console.log("pump account is "+document.getElementById("pumpacc").value);
  if (document.getElementById("pumpacc").value != ""){
   Session.set("pumpacc", document.getElementById("pumpacc").value);
   console.log("pump account is "+Session.get("pumpacc"));
   if(document.getElementById("deposit").value != ""){
      Session.set("deposit", document.getElementById("deposit").value);
    console.log("depsit is "+Session.get("deposit"));
    
    deposit();
   }else{
    console.log("please enter deposit amount")
   }
  } else {
   console.log("please enter a pump account")
  }
  
  },
});

var deposit = function(){
 
 Session.set("state","Auth");
 
 var txObject = {
      value: web3.toWei(Session.get("deposit"), 'ether'),
      gas: 300000,
      from: web3.eth.accounts[0]
    };


    var myContract = web3.eth.contract(abiArray).at(ContractAddress);

    myContract.deposit.sendTransaction(Session.get("pumpacc"), txObject, function(err, result){
     if(!err){
      console.log("succsecc:"+result);
       var timer;
       clearInterval(timer);
       timer = setInterval(function(){
        console.log("pending...");
         var receipt = web3.eth.getTransactionReceipt(result);
         if (receipt) {
          console.log("receive deposit:"+web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]), 'ether'));
           clearInterval(timer);
           console.log(receipt);
      startGetDepositAmountInterval();
         }
       }, 1000);
     } else {
       console.log("err"+err);
       //done();
     }
  });
}

var IntervalId = null;
var startGetDepositAmountInterval = function(){

 console.log("start getDepositAmount");

 IntervalId = setInterval(function() {
  getDepositAmount();
 }, 1000);
}

var getDepositAmount = function(){
 var myContract = web3.eth.contract(abiArray).at(ContractAddress);

 myContract.getDepositAmount(1, function(err, result){
  if(!err){
   console.log("sucsess:"+result);
   if(result == 0){
    console.log("authoraized");
    clearInterval(IntervalId);
    Session.set("state","Refuel");
    startGetChangeAmountInterval();
   } else {
    console.log("authoraizing now...");
   }
  } else{
   console.log(err);
  }
 });
}

var getChangeAmountIntervalId = null;
var startGetChangeAmountInterval = function(){

 console.log("start getChangeAmount");

 getChangeAmountIntervalId = setInterval(function() {
  getChangeAmount();
 }, 1000);
}

var getChangeAmount = function(){
 var myContract = web3.eth.contract(abiArray).at(ContractAddress);

 myContract.getChangeAmount(1, function(err, result){
  if(!err){
   console.log("sucsess:"+result);
   if(result != 0){
    console.log("finish to refuel.");
    clearInterval(getChangeAmountIntervalId);
    Session.set("state","Finish");
    var tempChange = "_"+result;
    Session.set("change", tempChange.substr(1));
    withdrawChange();
   } else {
    console.log("refueling now...");
   }
  } else{
   console.log(err);
  }
 });
}

var withdrawChange = function(){
 console.log("withdrawChange");

 var myContract = web3.eth.contract(abiArray).at(ContractAddress);
 var txObject = {
   from: web3.eth.accounts[0],
      to: web3.eth.accounts[0]
  };
 
 myContract.withdrawChange.sendTransaction(txObject, function(err, result){
   if(!err){
    console.log("succsecc:"+result);
      var timer;
      clearInterval(timer);
      timer = setInterval(function(){
       console.log("withdraw change...");
        var receipt = web3.eth.getTransactionReceipt(result);
        if (receipt) {
          clearInterval(timer);
     getReceipt();
        }
      }, 1000);
    } else {
     console.log("err"+err);
      //done();
    }
  });
}

var getReceipt = function(){
 console.log("getReceipt");
 
  Session.set("date", new Date());
// Session.set("price", tempPrice);
  getGasAmount();
 getBillAmount();
//  Session.set("deposit", tempDeposit);
//  Session.set("change", tempChange);
}

var getGasAmount = function(){
 var myContract = web3.eth.contract(abiArray).at(ContractAddress);

 myContract.getGasAmount(1, function(err, result){
  if(!err){
   console.log("sucsess:"+result);
   var tempGasAmount = "_"+result;
   Session.set("amount", tempGasAmount.substr(1));
  } else{
   console.log(err);
  }
 });
}

var getBillAmount = function(){
 var myContract = web3.eth.contract(abiArray).at(ContractAddress);

 myContract.getBillAmount(1, function(err, result){
  if(!err){
   console.log("sucsess:"+result);
   var tempBillAmount = "_"+result;
     Session.set("bill", tempBillAmount.substr(1));
  } else{
   console.log(err);
  }
 });
}

var getGasPrice = function(){
 var myContract = web3.eth.contract(abiArray).at(ContractAddress);

 myContract.getGasPrice(1, function(err, result){
  if(!err){
   console.log("sucsess:"+result);
   var tempGasPrice = "_"+result;
     Session.set("price", tempGasPrice.substr(1));
  } else{
   console.log(err);
  }
 });
}


Session.setDefault("date", new Date());
Session.setDefault("price",3.001);
Session.setDefault("amount", 5);
Session.setDefault("bill","null");
Session.setDefault("change","null");
getGasPrice();

Template.receipt.helpers({
  date:function() {
    return Session.get("date");
  }, price:function() {
    // get from smart contract
    return Session.get("price");
  }, amount:function() {
    
    return Session.get("amount");
  }, bill:function() {
    
    return Session.get("bill");
  }, deposit:function() {
    
    return Session.get("deposit");
  }, change:function() {
    
    return Session.get("change");
  },
});
