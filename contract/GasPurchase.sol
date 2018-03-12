pragma solidity ^0.4.20;

contract carAccount{
    
    address carAddr;
    address pompAddr;
    
    bool authFlag = false;
    bool fuelFlag = false;
    
    uint fuelType;
    uint amountofgas;
    
    uint depositamount;
    uint billamount;
    uint changeamount;
    
    
    // when a car arrived at gas station, a car send a message to contract for authentication.
    function authCar(address _carAddr, address _pompAddr){// constant returns(address carAddr, address pompAddr, bool authFlag){
        carAddr = _carAddr;
        pompAddr = _pompAddr;

        if(carAddr.balance > 99*1000000000000000000){
            authFlag = true;
        }
            
        //return (carAddr, pompAddr, authFlag);
    }

    function checkAuthFlag(uint b) constant returns(bool a){
        return authFlag;
    }
    
    // a car selects fuel type 1. Full(munual), 2. gas amount specified(auto), 3. money specified(auto)
    function selectType(uint _type) constant returns(uint _fuelType, bool fuelFlag){
        if (authFlag==true) {
            fuelType = _type;
            fuelFlag = true;
            return (fuelType, fuelFlag);
        } else {
            fuelFlag = false;
            return (fuelType, fuelFlag);
        }
    }    
   
    function stopFueling(uint _gas) constant returns(uint _amountofgas){
        amountofgas = _gas;
        return amountofgas;
    }
    
    function getDepositAmount(uint b) constant returns(uint a){
        return depositamount;
    }
    
    function deposit() public payable{
        
        depositamount += msg.value;
        
    }
    
    
    function withdraw() public{
        
        msg.sender.transfer(depositamount);
        depositamount = 0;
    }

}
