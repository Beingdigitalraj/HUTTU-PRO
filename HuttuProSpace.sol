// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract HuttuPro is ReentrancyGuard {
    // यूजर का डेटा
    mapping(address => uint256) public balances;

    // पैसे जमा करने का सुरक्षित तरीका
    function deposit() external payable {
        require(msg.value > 0, "Amount must be > 0");
        balances[msg.sender] += msg.value;
    }

    // यूजर अपना पैसा खुद क्लेम करेगा (Push-Pull Pattern)
    function withdraw(uint256 _amount) external nonReentrant {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        balances[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
    }
}
