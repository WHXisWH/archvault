// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MockPayments {
    address public owner;
    mapping(address => uint256) public balances;

    event Subscribed(address indexed user, uint256 planId);
    event Paid(address indexed from, address indexed to, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function subscribe(uint256 planId) external {
        emit Subscribed(msg.sender, planId);
    }

    function makePayment(address to, uint256 amount, address tokenAddress) external {
        // In a real contract, you would transfer tokens
        // IERC20(tokenAddress).transferFrom(msg.sender, to, amount);
        balances[to] += amount;
        emit Paid(msg.sender, to, amount);
    }

    function settle(address user) external {
        // Simulate settling payments
        balances[user] = 0;
    }
}
