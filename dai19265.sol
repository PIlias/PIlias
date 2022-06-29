pragma solidity >=0.5.9;

contract Bidder {
    string public name;
    uint public bidAmount = 20000;
    bool public eligible;
    uint constant minBid = 1000;

    function setName(string memory yourName) public {
        name = yourName;
    }

    function setBidAmount(uint amount) public {
        bidAmount = amount;
    }

    function determineEligibility() public {
        if (bidAmount >= minBid){
            eligible = true;
        }else{
            eligible = false;
        }    
    }
}
// Αddress : 0x600D6BF676A9e60dFc039eF98181A52CeEB83204