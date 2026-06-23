// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Reentrancy से बचने के लिए
abstract contract ReentrancyGuard {
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;
    uint256 private _status = _NOT_ENTERED;
    modifier nonReentrant() {
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");
        _status = _ENTERED;
        _;
        _status = _NOT_ENTERED;
    }
}

contract HuttuProMLM is ReentrancyGuard {
    address public owner;
    uint256 public totalUsers;
    uint256[7] public levelPercentages = [1000, 500, 300, 200, 100, 50, 50]; 

    struct User {
        bool isRegistered;
        address referrer;
        uint256 totalStaked;
        uint256 totalEarnings;
    }

    mapping(address => User) public users;

    constructor() {
        owner = msg.sender;
        users[msg.sender].isRegistered = true;
        totalUsers = 1;
    }

    // .call का उपयोग सुरक्षित है (transfer से बेहतर)
    function invest(address _referrer) external payable nonReentrant {
        require(msg.value > 0, "Investment must be > 0");
        
        if (!users[msg.sender].isRegistered) {
            require(users[_referrer].isRegistered, "Referrer must be registered");
            users[msg.sender].isRegistered = true;
            users[msg.sender].referrer = _referrer;
            totalUsers++;
        }

        users[msg.sender].totalStaked += msg.value;

        address currentReferrer = users[msg.sender].referrer;
        for (uint256 i = 0; i < 7; i++) {
            uint256 commission = (msg.value * levelPercentages[i]) / 10000;
            
            if (currentReferrer == address(0)) {
                (bool sent, ) = payable(owner).call{value: commission}("");
                require(sent, "Failed to send to owner");
            } else {
                users[currentReferrer].totalEarnings += commission;
                (bool sent, ) = payable(currentReferrer).call{value: commission}("");
                require(sent, "Failed to send commission");
                currentReferrer = users[currentReferrer].referrer;
            }
        }
    }
}
