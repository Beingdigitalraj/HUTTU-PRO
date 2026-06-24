// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract HuttuProMLM is ReentrancyGuard {
    address public owner;
    uint256[7] public levelPercentages = [1000, 500, 300, 200, 100, 50, 50]; 

    struct User {
        bool isRegistered;
        address referrer;
        uint256 totalStaked;
        uint256 pendingEarnings; // कमीशन के लिए
        uint256 totalWithdrawn;
    }

    mapping(address => User) public users;

    constructor() {
        owner = msg.sender;
        users[msg.sender].isRegistered = true;
    }

    // इन्वेस्ट करने का तरीका
    function invest(address _referrer) external payable nonReentrant {
        require(msg.value > 0, "Amount must be > 0");
        
        if (!users[msg.sender].isRegistered) {
            require(users[_referrer].isRegistered, "Invalid referrer");
            users[msg.sender].isRegistered = true;
            users[msg.sender].referrer = _referrer;
        }

        address currentReferrer = users[msg.sender].referrer;
        for (uint256 i = 0; i < 7; i++) {
            uint256 commission = (msg.value * levelPercentages[i]) / 10000;
            
            if (currentReferrer != address(0)) {
                users[currentReferrer].pendingEarnings += commission;
                currentReferrer = users[currentReferrer].referrer;
            } else {
                users[owner].pendingEarnings += commission; // बची हुई कमीशन ओनर को
                break; 
            }
        }
    }

    // सुरक्षित विड्रॉल फंक्शन
    function withdrawEarnings() external nonReentrant {
        uint256 amount = users[msg.sender].pendingEarnings;
        require(amount > 0, "No earnings");

        users[msg.sender].pendingEarnings = 0;
        users[msg.sender].totalWithdrawn += amount;

        (bool sent, ) = payable(msg.sender).call{value: amount}("");
        require(sent, "Withdrawal failed");
    }
}
