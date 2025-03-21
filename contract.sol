// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TutoringNFT {
    address public owner;
    uint256 private tokenCounter;
    uint256 public platformFee = 500; // 5% platform fee in basis points
    
    enum SessionStatus { Available, Booked, Completed, Cancelled }
    
    struct Session {
        address tutor;
        address student;
        uint256 price;
        uint256 duration;
        string subject;
        uint256 scheduledTime;
        SessionStatus status;
    }
    
    // Token ownership and metadata
    mapping(uint256 => address) private tokenOwner;
    mapping(uint256 => string) private tokenURIs;
    mapping(uint256 => Session) public sessions;
    mapping(address => bool) public verifiedTutors;
    
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event SessionCreated(uint256 tokenId, address tutor, uint256 price);
    event SessionBooked(uint256 tokenId, address student, uint256 scheduledTime);
    event SessionCompleted(uint256 tokenId);
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    function createSession(uint256 price, uint256 duration, string memory subject, string memory tokenURI) 
        external returns (uint256) {
        require(price > 0, "Price must be greater than zero");
        
        tokenCounter++;
        uint256 newTokenId = tokenCounter;
        
        tokenOwner[newTokenId] = msg.sender;
        tokenURIs[newTokenId] = tokenURI;
        
        sessions[newTokenId] = Session(
            msg.sender, address(0), price, duration, subject, 0, SessionStatus.Available
        );
        
        emit Transfer(address(0), msg.sender, newTokenId);
        emit SessionCreated(newTokenId, msg.sender, price);
        return newTokenId;
    }
    
    function bookSession(uint256 tokenId, uint256 scheduledTime) external payable {
        Session storage session = sessions[tokenId];
        require(session.status == SessionStatus.Available, "Session not available");
        require(msg.value >= session.price, "Insufficient payment");
        require(tokenOwner[tokenId] == session.tutor, "Token ownership mismatch");
        
        address previousOwner = tokenOwner[tokenId];
        tokenOwner[tokenId] = msg.sender;
        
        session.student = msg.sender;
        session.scheduledTime = scheduledTime;
        session.status = SessionStatus.Booked;
        
        emit Transfer(previousOwner, msg.sender, tokenId);
        emit SessionBooked(tokenId, msg.sender, scheduledTime);
    }
    
    function completeSession(uint256 tokenId) external {
        Session storage session = sessions[tokenId];
        require(session.student == msg.sender, "Only student can complete");
        require(session.status == SessionStatus.Booked, "Session not booked");
        
        uint256 platformAmount = (session.price * platformFee) / 10000;
        uint256 tutorAmount = session.price - platformAmount;
        
        payable(session.tutor).transfer(tutorAmount);
        payable(owner).transfer(platformAmount);
        
        session.status = SessionStatus.Completed;
        emit SessionCompleted(tokenId);
    }
    
    function verifyTutor(address tutor, bool isVerified) external onlyOwner {
        verifiedTutors[tutor] = isVerified;
    }
}
