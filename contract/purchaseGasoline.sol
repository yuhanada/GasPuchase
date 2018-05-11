pragma solidity ^0.4.20;

contract purchaseGas{
    uint ticketId;
    
    enum StationState{
        Closed, Open
    }
    
    struct Price{
        uint diesel;
        uint regular;
        uint plus;
        uint premium;
    }
    
    enum TypeofGas{
        Diesel, Regular, Plus, Premium
    }
    
    struct Order{
        address carAcc;
        TypeofGas typeofgas;
        uint gal;
        uint deposit;
        bool confirmationstate;
    }
    
    struct Station{
        address stationAcc;
        StationState state;
        //uint[4] price; // 0:diesel, 1:regular, 2:plus, 3:premium
        Price prices;
        mapping (address => Order) orders;

    }
    
    //Staion[] stations;
    mapping (address => Station) stations;
    
    uint count;
    function registerStation(address _stationAcc) public returns(uint _count){
        var tempStationAcc = _stationAcc;
        count += 1;
        stations[tempStationAcc].stationAcc = tempStationAcc;
        return count;
    }
    
    function getGSInfors(address _stationAcc) constant returns(address __stationAcc, uint _price){
        return (stations[_stationAcc].stationAcc, stations[_stationAcc].prices.diesel);
    }
    
    function changePrice(uint _price, address _stationAcc){
        stations[_stationAcc].prices.diesel = _price;
        
    }
    
    function sendOrder(TypeofGas _typeofgas, uint _gal, address _stationAcc) public payable returns(bool _result){
        
        bool result = false;
        
        if(stations[_stationAcc].stationAcc == _stationAcc){
            stations[_stationAcc].orders[msg.sender].carAcc = msg.sender;
            stations[_stationAcc].orders[msg.sender].typeofgas = _typeofgas;
            stations[_stationAcc].orders[msg.sender].gal = _gal;
            stations[_stationAcc].orders[msg.sender].deposit = msg.value;
            stations[_stationAcc].orders[msg.sender].confirmationstate = false;
            
            result = true;
        }else{
            result = false;
        }
        
        return result;
    }
    
    function getOrder(address _carAcc) constant returns(address __carAcc, TypeofGas _typeofgas, uint _gal, uint _deposit){
        return (
            stations[msg.sender].orders[_carAcc].carAcc,
            stations[msg.sender].orders[_carAcc].typeofgas,
            stations[msg.sender].orders[_carAcc].gal,
            stations[msg.sender].orders[_carAcc].deposit
            );
    }
    
    function sendConfirmation(address _stationAcc){
        stations[_stationAcc].orders[msg.sender].confirmationstate = true;
    }
    
    function sendCancel(address _stationAcc){
        if(stations[_stationAcc].orders[msg.sender].confirmationstate == false){
            msg.sender.transfer(stations[_stationAcc].orders[msg.sender].deposit);
            delete stations[_stationAcc].orders[msg.sender];
        }
    }
    
    function payout(address _carAcc) public{
        if(stations[msg.sender].orders[_carAcc].confirmationstate == true && stations[msg.sender].stationAcc == msg.sender){
            msg.sender.transfer(stations[msg.sender].orders[_carAcc].deposit);
        }
    }
    
}
