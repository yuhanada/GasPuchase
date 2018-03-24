pragma solidity ^0.4.20;

contract GasPurchase{
    
    address carAcc;
    address pumpAcc;
    
    uint gasPrice;
    uint gasAmount;
    uint billAmount;
    
    uint depositAmount;
    uint changeAmount;
    
    uint stateNumber =  0; // 0:Idle, 1:Auth, 2:Refuel, 3:Finish

    function getCarAccount(uint b) constant returns(address a){
        return carAcc;
    }
    
    function getPumpAccount(uint b) constant returns(address a){
        return pumpAcc;
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
    
    function getState(uint b) constant returns(uint a){
        return stateNumber;
    }

    function deposit(address _pumpAcc) public payable{
        depositAmount += msg.value;
        carAcc = msg.sender;
        pumpAcc = _pumpAcc;
        stateNumber=1;
    }
    
    function depositChange(address _carAcc, uint _gasAmount, uint _billAmount) public payable{
        changeAmount += msg.value;
        pumpAcc = msg.sender;
        carAcc = _carAcc;
        gasAmount = _gasAmount;
        billAmount = _billAmount;
        stateNumber=3;
    }
    
    function withdraw() public{
        if(pumpAcc == msg.sender){
            msg.sender.transfer(depositAmount);
            depositAmount = 0;
            carAcc = 0x00;
            pumpAcc = 0x00;
            stateNumber=2;
        }else{
            // ??
        }
    }
    
    function withdrawChange() public{
        if(carAcc == msg.sender){
           msg.sender.transfer(changeAmount);
            changeAmount = 0;
            carAcc = 0x00;
            pumpAcc = 0x00;
            stateNumber=0;
        }else{
            // ??
        }
    }
    
    function changeGasPrice(uint _gasPrice){
        gasPrice = _gasPrice;   
    }
    
    function allreset() public{
        carAcc = 0x00;
        pumpAcc = 0x00;
    
        gasPrice = 0;
        gasAmount = 0;
        billAmount = 0;
    
        depositAmount = 0;
        changeAmount = 0;
    }
    
    

}
