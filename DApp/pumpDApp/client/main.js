import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

// GasPurchase.sol ContractAddress
ContractAddress="0x1f9bd98fab640b6de1ae59c2884f0b2a6aee0513";
// GasPurchase.sol abiArray
abiArray=[{"constant":false,"inputs":[],"name":"allreset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"b","type":"uint256"}],"name":"getPumpAccount","outputs":[{"name":"a","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"b","type":"uint256"}],"name":"getDepositAmount","outputs":[{"name":"a","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_carAcc","type":"address"},{"name":"_gasAmount","type":"uint256"},{"name":"_billAmount","type":"uint256"}],"name":"depositChange","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_gasPrice","type":"uint256"}],"name":"changeGasPrice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawChange","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"b","type":"uint256"}],"name":"getChangeAmount","outputs":[{"name":"a","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"b","type":"uint256"}],"name":"getCarAccount","outputs":[{"name":"a","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"b","type":"uint256"}],"name":"getGasAmount","outputs":[{"name":"a","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"b","type":"uint256"}],"name":"getGasPrice","outputs":[{"name":"a","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"b","type":"uint256"}],"name":"getBillAmount","outputs":[{"name":"a","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_pumpAcc","type":"address"}],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"}];
//GasPurchase.sol's binary
binary="60606040526000600160146101000a81548160ff0219169083151502179055506000600160156101000a81548160ff021916908315150217905550341561004557600080fd5b610252806100546000396000f300606060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806351c1f50c1461005c578063971206a41461009e578063e95336c7146100d5575b600080fd5b341561006757600080fd5b61007d60048080359060200190919050506101ab565b60405180838152602001821515151581526020019250505060405180910390f35b34156100a957600080fd5b6100bf60048080359060200190919050506101f4565b6040518082815260200191505060405180910390f35b34156100e057600080fd5b61012b600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610207565b604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182151515158152602001935050505060405180910390f35b60008060011515600160149054906101000a900460ff16151514156101e257826002819055506001905060025481915091506101ef565b6000905060025481915091505b915091565b6000816003819055506003549050919050565b60008060008492508391506001905082828292509250925092509250925600a165627a7a723058200fac5e4c629190ea0feafe54688db07b05035052d6647cc1126615763b3f585e0029";



Template.gaspumpinformation.helpers({
  accountNo :function() {
    return web3.eth.accounts[0];
  },pumpBalance :function() {
    return web3.eth.getBalance(web3.eth.accounts[0]);
  },
});
Template.gaspumpinformation.events({
  
});

Session.setDefault('state', 'Idel');
Session.setDefault('deposit', 0);
Session.setDefault('caracc', null);
//Session.setDefault('price', 1000000000000000000);
Session.setDefault('price', 1);
console.log('price:'+Session.get('price'));
Session.setDefault('amount', 0);
Session.setDefault('bill', 0);
Session.setDefault('change', 0);

var getDepositAmount = function(){
	var myContract = web3.eth.contract(abiArray).at(ContractAddress);
  	
  myContract.getDepositAmount(1, function(err, result){
  	if(!err){
    	console.log("sucsess:"+result);
    	var tempDeposit = "_"+result;
    	if (tempDeposit != Session.get('deposit')) {
      	console.log(Session.get('deposit'));
      	console.log(tempDeposit);
      	
      	
      	
      	if (tempDeposit != "_0"){
	      	Session.set('state', 'Auth');
	      	clearInterval(IntervalId);
	      	getCarAccount();
	      	withdraw();
      	} else {
	      	Session.set('state', 'Idel');
	      	getCarAccount();
	      	//startGetDepositAmountInterval();
      	}
      }
      Session.set('deposit', tempDeposit);
      //console.log(Session.get('deposit'));
      var tempDepositA = Session.get('deposit').substr(1);
	    console.log("tempDepositA:"+tempDepositA);
    }else{
      console.log(err);
    }
  });
};

var IntervalId = null;
var startGetDepositAmountInterval = function(){
	IntervalId = setInterval(function() {
	  getDepositAmount();
	}, 1000);
}

var getCarAccount = function(){
	var myContract = web3.eth.contract(abiArray).at(ContractAddress);
  	
  myContract.getCarAccount(1, function(err, result){
  	if(!err){
    	console.log("sucsess:"+result);
    	
	    Session.set('caracc', result);
      //console.log(Session.get('deposit'));
    }else{
      console.log(err);
    }
  });
	
};

var withdraw = function(){
	var myContract = web3.eth.contract(abiArray).at(ContractAddress);
  var txObject = {
  	from: web3.eth.accounts[0],
     	to: web3.eth.accounts[0]
  }
  myContract.withdraw.sendTransaction(txObject, function(err, result){
  	if(!err){
    	console.log("sucsess:"+result);
			var timer;
			clearInterval(timer);
			
			timer = setInterval(function(){
				console.log("pending...");
				var receipt = web3.eth.getTransactionReceipt(result);
				if (receipt) {
					console.log("receive deposit:"+web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]), 'ether'));
          clearInterval(timer);
          Session.set('state', 'Refuel');
          prepareSelectRefuelType();
        }
      }, 1000);
    }else{
      console.log(err);
    }
  });
}

Template.refuelstate.helpers({
  state :function() {

    return Session.get('state');
  }, caracc :function(){
  	return Session.get('caracc');
  }, deposit :function(){
    return Session.get('deposit');
  }, price :function(){
  	return Session.get('price');
  }, amount : function(){
  	return Session.get('amount');
  }, bill : function(){
  	return Session.get('bill');
  }, change : function(){
  	return Session.get('change');
  },
});

Template.refuelstate.events({
  'click button'(event, instance) {
    console.log("click authentication OK button");
  },
});

var prepareSelectRefuelType = function(){
	document.getElementById("radio-0").disabled = false;
  document.getElementById("radio-1").disabled = false;
  document.getElementById("radio-2").disabled = false;
  document.getElementById("button").disabled = false;
};
Template.selectRefuelType.helpers({
  selectedrefueltype : function(){
  	return Session.get('fueltype');
  }
});
Template.selectRefuelType.events({
  'click #button': function(event, template){
     console.log("#button Enter clicked");
     decideRefuelType();
  },
  'click #radio-0' : function(event, template){
     console.log("#radio-0 clicked");
     document.getElementById("iN1").disabled = true;
     document.getElementById("iN2").disabled = true;
     radioPos = 0;
     console.log("radioPos: "+radioPos);
  },
  'click #radio-1' : function(event, template){
     console.log("#radio-1 clicked");
     document.getElementById("iN1").disabled = false;
     document.getElementById("iN2").disabled = true;
     radioPos = 1;
     console.log("radioPos: "+radioPos);
  },
  'click #radio-2' : function(event, template){
     console.log("#radio-2 clicked");
     document.getElementById("iN1").disabled = true;
     document.getElementById("iN2").disabled = false;
     radioPos = 2;
     console.log("radioPos: "+radioPos);
  }
});
Session.set('fueltype',"null");
Session.set('fuelFlag',"false");
Session.setDefault('limitGasAmount', 100);
function decideRefuelType(){

   Session.set('fuelFlag',"false");

   console.log("selectType()");
   if (radioPos == 0){
      console.log("radioPos: "+radioPos);
      Session.set('fueltype',"Full(manual)");
      Session.set('fuelFlag',"true");
      var tempLimitGasAmount = Session.get('deposit').substr(1) / Session.get('price');
      console.log("tempLimitGasAmount is " + tempLimitGasAmount);
      Session.set("limitGasAmount", tempLimitGasAmount);
   } else if(radioPos == 1){
      console.log("radioPos: "+radioPos);
      if (document.getElementById("iN1").value == ""){
         console.log("not yet entered");
      } else if (document.getElementById("iN1").value <= 0){
         console.log("inpossible");
      } else if (document.getElementById("iN1").value > 10){
         console.log("too much");
      } else {
         Session.set('fueltype',"Gas Amount Specified(Auto)");
         Session.set('fuelFlag',"true");
      }

   } else if(radioPos == 2){
      console.log("radioPos: "+radioPos);
      if (document.getElementById("iN2").value == ""){
         console.log("not yet entered");
      } else if (document.getElementById("iN2").value <= 0){
         console.log("inpossible");
      } else if (document.getElementById("iN2").value > 40){
         console.log("too much");
      } else {
         Session.set('fueltype',"Money Specified(Auto)");
         Session.set('fuelFlag',"true");
      }
   } else {
      console.log("radioPos: "+radioPos);
      Session.set('fueltype',"not selected");
      Session.set('fuelFlag',"false");

   }

   if (Session.get('fuelFlag') == "true"){
      document.getElementById("startBtn").disabled = false;
      document.getElementById("radio-0").disabled = true;
      document.getElementById("radio-1").disabled = true;
      document.getElementById("radio-2").disabled = true;
      document.getElementById("button").disabled = true;
   }
}

amountofgas = 0;
Template.refuelGas.helpers({
  amountofgas(){
      return Session.get('amount');
      //return amountofgas;
   }
});

var refueltimer;
Template.refuelGas.events({
  'click #startBtn': function(event, template){
     console.log("#button startBtn clicked");
     
     document.getElementById("startBtn").disabled = true;
     document.getElementById("stopBtn").disabled = false;
     document.getElementById("finBtn").disabled = true;

     clearInterval(refueltimer);
     refueltimer = setInterval(function(){
        
        amountofgas += 1.001;
        Session.set('amount', amountofgas);
        console.log("fueling...amount is " + amountofgas);
        if(amountofgas > (Session.get('limitGasAmount') - 1.001)){
        	clearInterval(refueltimer);
   	      document.getElementById("startBtn").disabled = true;
		      document.getElementById("stopBtn").disabled = true;
		      document.getElementById("finBtn").disabled = false;
        }
     }, 10);
   
  },
  'click #stopBtn': function(event, template){
     console.log("#button stopBtn clicked");
     clearInterval(refueltimer);
     document.getElementById("startBtn").disabled = false;
     document.getElementById("stopBtn").disabled = true;
     document.getElementById("finBtn").disabled = false;
  },
  'click #finBtn': function(event, template){
     console.log("#button finBtn clicked");
     amountofgas = 0;
     document.getElementById("startBtn").disabled = true;
     document.getElementById("stopBtn").disabled = true;
     document.getElementById("finBtn").disabled = true;
		Session.set('state', 'Finish');
		calcbill()
  },
});

var calcbill = function(){
	
	console.log('price:'+Session.get('price'));
	console.log('amount:'+Session.get('amount'));
	var tempBill = Session.get('price') * Session.get('amount');
	Session.set('bill', tempBill);
	console.log('bill:'+Session.get('bill'));
	console.log('deposit:'+Session.get('deposit'));
	var tempDeposit = Session.get('deposit').substr(1);
	console.log("tempDeposit:"+tempDeposit);
	var tempChange = tempDeposit - Session.get('bill');
	Session.set('change', tempChange);
	console.log(Session.get('change'));
	
	// deposit change
	depositChange();
	
}

var depositChange = function(){
	console.log("depositChange");
	var txObject = {
    value: Session.get('change'),
    gas: 300000,
    from: web3.eth.accounts[0]
  };

  console.log(web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]), 'ether'));
  var myContract = web3.eth.contract(abiArray).at(ContractAddress);
	myContract.depositChange.sendTransaction(Session.get('caracc'),Session.get('amount'),Session.get('bill'), txObject, function(err, result){
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
          startGetChangeAmountInterval();
        }
      }, 1000);
    } else {
      console.log("err"+err);
      done();
    }
  });
}

var getChangeAmountIntervalId = null;
var startGetChangeAmountInterval = function(){
	getChangeAmountIntervalId = setInterval(function() {
	  getChangeAmount();
	}, 1000);
};

var getChangeAmount = function(){
	var myContract = web3.eth.contract(abiArray).at(ContractAddress);
  	
  myContract.getChangeAmount(1, function(err, result){
  	if(!err){
    	console.log("sucsess:"+result);
    	if(result == 0){
    		console.log("Withdraw is finished.");
    		console.log("Gas Purchase is done.");
    		clearInterval(getChangeAmountIntervalId);
    		init();
    	} else {
    		console.log("customer is withdrawing now.");
    	}
    }else{
      console.log(err);
    }
  });
};

var getCurrentGasPrice = function(){
  var myContract = web3.eth.contract(abiArray).at(ContractAddress);
  	
  myContract.getGasPrice(1, function(err, result){
    if(!err){
      console.log("sucsess:"+result);
      var tempGasPrice = "_"+result;
      Session.set("price", tempGasPrice.substr(1));
    }else{
      console.log(err);
    }
  });
}
var init = function(){
	console.log("init");
	
	Session.set('state', 'Idel');
	Session.set('deposit', 0);
	Session.set('caracc', null);
	Session.set('amount', 0);
	Session.set('bill', 0);
	Session.set('change', 0);
	
	//document.getElementById("finBtn").disabled = true;
	
	getCurrentGasPrice();

	startGetDepositAmountInterval();
}
init();

