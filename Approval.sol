// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.0;

contract Approval {

    address payable public sender = payable(0x0);
    address payable public receiver = payable(0x0);
    address private approver;

    event LogDeposit(
        address payable _sender,
        address payable _receiver,
        uint amount
    );

    constructor () public {
        approver = msg.sender;
    }

    modifier restricted() {
        require(msg.sender == approver);
        _;
    }

    modifier credited() {
        require(address(this).balance > 0);
        _;
    }

    function deposit(address payable _receiver) public payable {
        require(msg.value > 0);
        sender = payable(msg.sender);
        receiver = _receiver;
        
        emit LogDeposit(sender, receiver, msg.value);
    }

    function viewApprover() public view returns(address, uint256) {
        return(approver, address(this).balance);
    }

    function approve() public restricted credited{
        require(receiver != payable(0x0));
        receiver.transfer(address(this).balance);
    }

    function reset() public restricted credited payable{
        sender.transfer(address(this).balance);
        sender = payable(0x0);
        receiver = payable(0x0);
    }
}
