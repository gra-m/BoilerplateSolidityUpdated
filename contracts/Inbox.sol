// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Inbox{
    string public getMessage;

    constructor(string memory initialMessage) {
        getMessage = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        getMessage = newMessage;
    }
}
