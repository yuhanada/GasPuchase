pragma solidity ^0.4.20;

contract GasPurchase{
    
    address carAcc;
    address pompAcc;
    
    uint gasPrice;
    uint gasAmount;
    uint billAmount;
    
    uint depositAmount;
    uint changeAmount;

    function getCarAccount(uint b) constant returns(address a){
        return carAcc;
    }
    
    function getPompAccount(uint b) constant returns(address a){
        return pompAcc;
    }
    function getGasPrice(uint b) constant returns(uint a){
        return gasPrice;
    }
    
    function getGasAmount(uint b) constant returns(uint a){
        return gasAmount;
    }

    function getBillAmount(uint b) constant returns(uint a){
        return billAmount;
    }
   
    function getDepositAmount(uint b) constant returns(uint a){
        return depositAmount;
    }

    function getChangeAmount(uint b) constant returns(uint a){
        return changeAmount;
    }

    function deposit(address _pompAcc) public payable{
        depositAmount += msg.value;
        carAcc = msg.sender;
        pompAcc = _pompAcc;
    }
    
    function depositChange(address _carAcc, uint _gasAmount, uint _billAmount) public payable{
        changeAmount += msg.value;
        pompAcc = msg.sender;
        carAcc = _carAcc;
        gasAmount = _gasAmount;
        billAmount = _billAmount;
    }
    
    function withdraw() public{
        if(pompAcc == msg.sender){
            msg.sender.transfer(depositAmount);
            depositAmount = 0;
            carAcc = 0x00;
            pompAcc = 0x00;
        }else{
            // ??
        }
    }
    
    function withdrawChange() public{
        if(carAcc == msg.sender){
           msg.sender.transfer(changeAmount);
            changeAmount = 0;
            carAcc = 0x00;
            pompAcc = 0x00;
        }else{
            // ??
        }
    }
    
    function changeGasPrice(uint _gasPrice){
        gasPrice = _gasPrice;   
    }
    
    function allreset() public{
        carAcc = 0x00;
        pompAcc = 0x00;
    
        gasPrice = 0;
        gasAmount = 0;
        billAmount = 0;
    
        depositAmount = 0;
        changeAmount = 0;
    }
    
    

}
