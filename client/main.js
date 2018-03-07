import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Session.setDefault('accountinfo',"hanada");
console.log("accountinfo: "+Session.get('accountinfo'));

/*//Verysimple.sol's ContractAddress
ContractAddress="0x8b604c7a08a75d8cbbca708b185aad14df1d7a79";
//Verysimple.sol's abiArray
abiArray=[{"constant":true,"inputs":[{"name":"_id","type":"uint256"}],"name":"getAccountInfo","outputs":[{"name":"_addr","type":"address"},{"name":"_balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"createAccount","outputs":[{"name":"_accountId","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_fromAccId","type":"uint256"},{"name":"_accAddr","type":"address"},{"name":"_cash","type":"uint256"}],"name":"deposit","outputs":[{"name":"_ret","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_fromAccId","type":"uint256"},{"name":"_accAddr","type":"address"},{"name":"_toAccId","type":"uint256"},{"name":"_money","type":"uint256"}],"name":"payment","outputs":[{"name":"_ret","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
//Verysimple.sol's binary
binary='0x6060604052341561000f57600080fd5b6104a98061001e6000396000f300606060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633b561afc146100675780639859387b146100d1578063bc157ac11461011e578063dac0746f14610181575b600080fd5b341561007257600080fd5b61008860048080359060200190919050506101ed565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390f35b34156100dc57600080fd5b610108600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610247565b6040518082815260200191505060405180910390f35b341561012957600080fd5b610167600480803590602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506102d6565b604051808215151515815260200191505060405180910390f35b341561018c57600080fd5b6101d3600480803590602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190803590602001909190505061038b565b604051808215151515815260200191505060405180910390f35b6000806001600084815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600160008581526020019081526020016000206001015491509150915091565b60006001600080828254019250508190555081600160008054815260200190815260200160002060000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060006001600080548152602001908152602001600020600101819055506000549050919050565b60008273ffffffffffffffffffffffffffffffffffffffff166001600086815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561034c5760009050610384565b816001600086815260200190815260200160002060010154016001600086815260200190815260200160002060010181905550600190505b9392505050565b600081600160008781526020019081526020016000206001015410156103b45760009050610475565b8373ffffffffffffffffffffffffffffffffffffffff166001600087815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156104285760009050610475565b816001600087815260200190815260200160002060010160008282540392505081905550816001600085815260200190815260200160002060010160008282540192505081905550600190505b9493505050505600a165627a7a7230582011bf69056f0fb456165329326f5abd85316d47d38a977c97f7333ee3b660e2ec0029';
*/
// GasPurchase.sol ContractAddress
ContractAddress="0x1c405ed8f0dd19c266bba8e493da62ef73dc2e0c";
// GasPurchase.sol abiArray
abiArray=[{"constant":true,"inputs":[{"name":"_type","type":"uint256"}],"name":"selectType","outputs":[{"name":"_fuelType","type":"uint256"},{"name":"fuelFlag","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_gas","type":"uint256"}],"name":"stopFueling","outputs":[{"name":"_amountofgas","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"b","type":"uint256"}],"name":"checkAuthFlag","outputs":[{"name":"a","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_carAddr","type":"address"},{"name":"_pompAddr","type":"address"}],"name":"authCar","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]	;
//GasPurchase.sol's binary
binary="60606040526000600160146101000a81548160ff0219169083151502179055506000600160156101000a81548160ff021916908315150217905550341561004557600080fd5b610252806100546000396000f300606060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806351c1f50c1461005c578063971206a41461009e578063e95336c7146100d5575b600080fd5b341561006757600080fd5b61007d60048080359060200190919050506101ab565b60405180838152602001821515151581526020019250505060405180910390f35b34156100a957600080fd5b6100bf60048080359060200190919050506101f4565b6040518082815260200191505060405180910390f35b34156100e057600080fd5b61012b600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610207565b604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182151515158152602001935050505060405180910390f35b60008060011515600160149054906101000a900460ff16151514156101e257826002819055506001905060025481915091506101ef565b6000905060025481915091505b915091565b6000816003819055506003549050919050565b60008060008492508391506001905082828292509250925092509250925600a165627a7a723058200fac5e4c629190ea0feafe54688db07b05035052d6647cc1126615763b3f585e0029";


console.log("main.contractaddress: "+ContractAddress);

Session.setDefault('caracc',"null");
Session.setDefault('pompacc',"null");
Session.setDefault('authFlag',"false");
console.log("caracc: "+Session.get('caracc')+", pompacc: "+Session.get('pompacc'));

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  console.log("hello.onCreated");
  this.counter = new ReactiveVar(0);
  EthBlocks.init();
  console.log("contractAddress:"+ContractAddress);
  console.log("finish hello.onCreated");
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
  currentBlock: function(){
    return EthBlocks.latest.number;
  },
  currentProvider: function(){
   return web3.currentProvider.host;
  },
  currentHashrate: function(){
    //return web3.eth.hashrate;
    //return web3.eth.getBalance(web3.eth.accounts[0]);
    //return web3.eth.gasPrice;
    return web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]), 'ether');
  },
  carAccount(){
    return Session.get('caracc');
  },
  pompAccount(){
    return Session.get('pompacc');
  },
  authFlag(){
    return Session.get('authFlag');
  }

});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
  'click #authBtn': function(event, template){
     console.log("#authBtn clicked");
     if (document.getElementById("caracc").value == "" || document.getElementById("pompacc").value == "") {
        console.log("caracc or pompacc is empty");
        Session.set('caracc', "null");
        Session.set('pompacc', "null");
        Session.set('authFlag',"false");
     } else {
        console.log("authentication is sucsess" + document.getElementById("caracc").value);

        Session.set('caracc',document.getElementById("caracc").value);
        Session.set('pompacc',document.getElementById("pompacc").value);

        var txObject = {
          //value: 20,
          //gas: 300000,
          from:Session.get('caracc')
        };
        var myContract = web3.eth.contract(abiArray).at(ContractAddress);
        console.log("myContract check value:"+myContract.carAddr);
        myContract.authCar.sendTransaction(Session.get('caracc'),Session.get('pompacc'), txObject, function(err, result){
        if(!err){
            console.log("succsecc:"+result);
            var timer;
            clearInterval(timer);
            timer = setInterval(function(){
               console.log("pending...");
               var receipt = web3.eth.getTransactionReceipt(result);
               if (receipt) {
                  console.log("receive authCar:"+myContract.carAddr);
                  clearInterval(timer);
                  
                  var checkContract = web3.eth.contract(abiArray).at(ContractAddress);

                  checkContract.checkAuthFlag(1, function(err, result){
                    if(!err){
                      console.log("sucsess:"+result);
                      //Session.set('accountinfo','yuichi');

                      if(result){
                        Session.set('authFlag',"true");
                        console.log("caracc: "+Session.get('caracc')+", pompacc: "+Session.get('pompacc'));

                        document.getElementById("radio-0").disabled = false;
                        document.getElementById("radio-1").disabled = false;
                        document.getElementById("radio-2").disabled = false;
                        document.getElementById("button").disabled = false;

                        document.getElementById("caracc").disabled = true;
                        document.getElementById("pompacc").disabled = true;
                        document.getElementById("authBtn").disabled = true;
                      }

                     }else{
                       console.log("error");
                     } 
                  });

               }
            }, 1000);
          } else {
           console.log("err"+err);
           //done();
          }
        });

     }
  },
});

Template.selectType.helpers({
  
   selectedtype(){
      return Session.get('fueltype');
   },
   fuelflag(){
    return Session.get('fuelFlag');
   }
});

radioPos = 3;
console.log("radioPos: "+radioPos);
Session.setDefault('feultype',"null");
Session.setDefault('feulFlag',"false");

Template.selectType.events({
  
  'click #button': function(event, template){
     console.log("#button Enter clicked");
     selectType();
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

function selectType(){

   Session.set('fuelFlag',"false");

   console.log("selectType()");
   if (radioPos == 0){
      console.log("radioPos: "+radioPos);
      Session.set('fueltype',"Full(manual)");
      Session.set('fuelFlag',"true");
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
Session.setDefault('amountofgas',"0");

Template.fuelgasoline.helpers({
  
   amountofgas(){
      return Session.get('amountofgas');
      //return amountofgas;
   }
});


var timer;
Template.fuelgasoline.events({

  'click #startBtn': function(event, template){
     console.log("#button startBtn clicked");
     
     document.getElementById("startBtn").disabled = true;
     document.getElementById("stopBtn").disabled = false;
     document.getElementById("finBtn").disabled = true;

     clearInterval(timer);
     timer = setInterval(function(){
        
        amountofgas += 1.001;
        Session.set('amountofgas', amountofgas);
        console.log("fueling...amount is " + amountofgas);
     }, 10);
   
  },
  'click #stopBtn': function(event, template){
     console.log("#button stopBtn clicked");
     clearInterval(timer);
     document.getElementById("startBtn").disabled = false;
     document.getElementById("stopBtn").disabled = true;
     document.getElementById("finBtn").disabled = false;
  },
  
});

Session.setDefault('billamount',"null");
Session.setDefault('payFlag',"not yet");

Template.payment.helpers({
  
   billamount(){
      return Session.get('billamount');
   },
   paymentFlag(){
      return Session.get('payFlag');
   }
});



Template.payment.events({

  'click #finBtn': function(event, template){
     console.log("#button finBtn clicked");
     document.getElementById("startBtn").disabled = true;
     document.getElementById("stopBtn").disabled = true;
     calcBill();
  },
  'click #payBtn': function(event, template){
     console.log("#button payBtn clicked");
     payment();
  }
  
});

gasPrice = 3.001;

function calcBill(){
   console.log("calcBill()");

   billamount = amountofgas * gasPrice;
   Session.set('billamount',billamount);
   document.getElementById("finBtn").disabled = true;
   document.getElementById("payBtn").disabled = false;
}

function payment(){
   console.log("payment()");
   document.getElementById("payBtn").disabled = true;

   var txObj = {
       from: Session.get('caracc'),
       to:   Session.get('pompacc'),
       value:web3.toWei(Session.get('billamount'), 'ether')
    };

    web3.eth.sendTransaction(txObj, function(err, res){
       console.log("Transactoin Hash:", res, err);
       if(!err){
	  console.log("not err");
       
          var timer;
          clearInterval(timer);
          timer = setInterval(function(){
             console.log("pending...");
             var receipt = web3.eth.getTransactionReceipt(res);
             if (receipt) {
                console.log("receive");
                clearInterval(timer);
                Session.set('payFlag',"done");
             }
          }, 1000);
       } else {
         console.error(err);
         done();
       }
    });
}

Template.gasprice.helpers({
	currentgasprice(){
    	return gasPrice;
	}

});

Template.gasprice.events({
	'click #priceBtn': function(event, template){
		console.log("pushed priceBtn");
		if(document.getElementById("gaspriceinput").value == ""){
			console.log("please enter the price.");
		} else if(document.getElementById("gaspriceinput").value > 4 || document.getElementById("gaspriceinput").value < 2 ){
			console.log("please enter appropriate price");		
		}else {
			
			console.log("Gas price is "+ document.getElementById("gaspriceinput").value);
			gasPrice = document.getElementById("gaspriceinput").value;
			console.log("Gas price is "+ gasPrice);
		}
	}
});

Template.getaccount.helpers({
   AccountInfo() {
      console.log("getaccount.helpers: accountinfo: "+Session.get('accountinfo'));
      //Session.set('accountinfo','yuichi');
      return Session.get('accountinfo');
   }
});

Template.makeContract.events({
  'click button'(event, instance){
     console.log("click button makeContract");

// how to make contrat
/*     var accountscontract = web3.eth.contract(abiArray);
       var AccountsContract = accountscontract.new({
             from: web3.eth.accounts[0],
             data:binary, 
             gas: '4700000'
           }, function (e, contract){
             if (typeof contract.address !== 'undefined') {
               console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
            }
         })
*/

     console.log("finish click button makeContract");
  },
});

Template.getaccount.events({
  'click button'(event, instance){
     console.log("click button getaccount");
     var myContract = web3.eth.contract(abiArray).at(ContractAddress);

     myContract.getAccountInfo(5,function(err, result){
        if(!err){
           console.log("sucsess:"+result);
           //Session.set('accountinfo','yuichi');

        }
     });

     console.log("finish click button getaccount");
  },
});


Template.createaccount.events({
  'click button'(event, instance){

     console.log("click button createaccount");

/*     web3.eth.browser_verysimple_sol_accounts.createAccount.sendTransaction(web3.eth.accounts[0], {from: web3.eth.accounts[0]});
     console.log("finish click button createaccount");*/

  var txObject = {
        //value: 20,
        //gas: 300000,
        from:web3.eth.accounts[0]
     };
  var myContract = web3.eth.contract(abiArray).at(ContractAddress);
  myContract.createAccount.sendTransaction("0x0ac797e204c117fe474c454ea400f834d44cbc7f", txObject, function(err, result){
    if(!err){
       console.log("succsecc:"+result);
       var timer;
          clearInterval(timer);
          timer = setInterval(function(){
             console.log("pending...");
             var receipt = web3.eth.getTransactionReceipt(result);
             if (receipt) {
                console.log("receive");

                Session.set('accountinfo', 'yuichi');

                clearInterval(timer);
             }
          }, 1000);
       } else {
         console.error(err);
         done();
       }
  });

  },
});

Template.transfer.events({
  'click button'(event, instance){

     console.log("click button transfer");
     var txObj = {
  //     from: "0x7323c4de94e28853bdbc7fd77b8b40f762ba4984",
    //   to:   "0x0ac797e204c117fe474c454ea400f834d44cbc7f",
       from:   "0x0ac797e204c117fe474c454ea400f834d44cbc7f",
       to: "0x7323c4de94e28853bdbc7fd77b8b40f762ba4984",
       value:web3.toWei(gasPrice, 'ether')
    };

    web3.eth.sendTransaction(txObj, function(err, res){
       console.log("Transactoin Hash:", res, err);
       if(!err){
	  console.log("not err");
       
          var timer;
          clearInterval(timer);
          timer = setInterval(function(){
             console.log("pending...");
             var receipt = web3.eth.getTransactionReceipt(res);
             if (receipt) {
                console.log("receive");
                clearInterval(timer);
                Session.set('payFlag',"done");
             }
          }, 1000);
       } else {
         console.error(err);
         done();
       }
    });
     
     
  },
});



/*Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
    
    console.log(web3.eth.accounts);
    var txObj = {
       from: web3.eth.accounts[0],
       to:   web3.eth.accounts[1],
       value:web3.toWei('3915', 'ether')
    };

    web3.eth.sendTransaction(txObj, function(err, res){
       console.log("Transactoin Hash:", res, err);
       if(!err){
	  console.log("not err");
       
          var timer;
          clearInterval(timer);
          timer = setInterval(function(){
             console.log("pending...");
             var receipt = web3.eth.getTransactionReceipt(res);
             if (receipt) {
                console.log("receive");
                clearInterval(timer);
             }
          }, 1000);
       } else {
         console.error(err);
         done();
       }
    });
  },
});*/



