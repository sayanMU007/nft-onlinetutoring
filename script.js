// Contract ABI and address
const contractABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "tutor",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            }
        ],
        "name": "SessionCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "student",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "scheduledTime",
                "type": "uint256"
            }
        ],
        "name": "SessionBooked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "SessionCompleted",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "scheduledTime",
                "type": "uint256"
            }
        ],
        "name": "bookSession",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "completeSession",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "subject",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "tokenURI",
                "type": "string"
            }
        ],
        "name": "createSession",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "platformFee",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "sessions",
        "outputs": [
            {
                "internalType": "address",
                "name": "tutor",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "student",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "subject",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "scheduledTime",
                "type": "uint256"
            },
            {
                "internalType": "enum TutoringNFT.SessionStatus",
                "name": "status",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "tutor",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "isVerified",
                "type": "bool"
            }
        ],
        "name": "verifyTutor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "verifiedTutors",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const CONTRACT_ADDRESS = '0x123456789abcdef123456789abcdef123456789'; // Replace with actual contract address

// App State
let web3;
let contract;
let currentAccount = null;
let isVerifiedTutor = false;
let availableSessions = [];
let bookedSessions = [];
let myTutoringSessions = [];

// DOM Elements
const connectWalletBtn = document.getElementById('connectWallet');
const walletInfo = document.getElementById('walletInfo');
const walletAddressEl = document.getElementById('walletAddress');
const verificationBadge = document.getElementById('verificationBadge');
const verificationStatus = document.getElementById('verificationStatus');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const createSessionForm = document.getElementById('createSessionForm');
const availableSessionsEl = document.getElementById('availableSessions');
const bookedSessionsEl = document.getElementById('bookedSessions');
const myTutoringSessionsEl = document.getElementById('myTutoringSessions');
const bookingModal = document.getElementById('bookingModal');
const closeModal = document.querySelector('.close-modal');
const bookingForm = document.getElementById('bookingForm');
const sessionDetailsEl = document.getElementById('sessionDetails');
const bookingTokenIdEl = document.getElementById('bookingTokenId');
const bookingPriceEl = document.getElementById('bookingPrice');
const platformFeeEl = document.getElementById('platformFee');
const totalPriceEl = document.getElementById('totalPrice');
const sessionSearch = document.getElementById('sessionSearch');
const subjectFilter = document.getElementById('subjectFilter');

// Initialize the application
async function init() {
    setupEventListeners();
    
    // Check if MetaMask is installed
    if (window.ethereum) {
        try {
            web3 = new Web3(window.ethereum);
            contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);
            
            // Check if already connected
            const accounts = await web3.eth.getAccounts();
            if (accounts.length > 0) {
                await connectWallet();
            }
        } catch (error) {
            console.error("Error initializing Web3:", error);
        }
    } else {
        alert("Please install MetaMask to use this application.");
    }
}

// Set up event listeners
function setupEventListeners() {
    // Connect wallet button
    connectWalletBtn.addEventListener('click', connectWallet);
    
    // Tab navigation
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // Create session form
    createSessionForm.addEventListener('submit', handleCreateSession);
    
    // Modal close button
    closeModal.addEventListener('click', () => {
        bookingModal.style.display = 'none';
    });
    
    // Booking form
    bookingForm.addEventListener('submit', handleBookSession);
    
    // Search and filter
    sessionSearch.addEventListener('input', filterSessions);
    subjectFilter.addEventListener('change', filterSessions);
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            bookingModal.bookingModal.style.display = 'none';
        }
    });
    
    // Listen for account changes in MetaMask
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length > 0) {
                connectWallet();
            } else {
                disconnectWallet();
            }
        });
    }
}

// Connect to MetaMask wallet
async function connectWallet() {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        currentAccount = accounts[0];
        
        // Update UI
        walletInfo.style.display = 'block';
        connectWalletBtn.style.display = 'none';
        walletAddressEl.textContent = `${currentAccount.substring(0, 6)}...${currentAccount.substring(currentAccount.length - 4)}`;
        
        // Check if user is a verified tutor
        await checkTutorVerification();
        
        // Load sessions
        await loadSessions();
        
    } catch (error) {
        console.error("Error connecting wallet:", error);
    }
}

// Disconnect wallet
function disconnectWallet() {
    currentAccount = null;
    walletInfo.style.display = 'none';
    connectWalletBtn.style.display = 'block';
    verificationBadge.style.display = 'none';
    verificationStatus.textContent = '';
}

// Check if the connected account is a verified tutor
async function checkTutorVerification() {
    try {
        isVerifiedTutor = await contract.methods.verifiedTutors(currentAccount).call();
        
        if (isVerifiedTutor) {
            verificationBadge.style.display = 'inline-block';
            verificationStatus.textContent = 'Verified Tutor';
        } else {
            verificationBadge.style.display = 'none';
            verificationStatus.textContent = '';
        }
    } catch (error) {
        console.error("Error checking tutor verification:", error);
    }
}

// Switch between tabs
function switchTab(tabId) {
    // Hide all tab contents
    tabContents.forEach(content => {
        content.style.display = 'none';
    });
    
    // Remove active class from all tab buttons
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab content and add active class to button
    document.getElementById(tabId).style.display = 'block';
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
}

// Handle create session form submission
async function handleCreateSession(event) {
    event.preventDefault();
    
    if (!currentAccount) {
        alert("Please connect your wallet first.");
        return;
    }
    
    if (!isVerifiedTutor) {
        alert("You need to be a verified tutor to create sessions.");
        return;
    }
    
    const price = web3.utils.toWei(document.getElementById('sessionPrice').value, 'ether');
    const duration = document.getElementById('sessionDuration').value * 60; // Convert to minutes
    const subject = document.getElementById('sessionSubject').value;
    const tokenURI = document.getElementById('sessionTokenURI').value || 'ipfs://defaultURI';
    
    try {
        const gasEstimate = await contract.methods.createSession(price, duration, subject, tokenURI)
            .estimateGas({ from: currentAccount });
            
        await contract.methods.createSession(price, duration, subject, tokenURI)
            .send({ from: currentAccount, gas: gasEstimate });
            
        alert("Session created successfully!");
        createSessionForm.reset();
        await loadSessions();
        
    } catch (error) {
        console.error("Error creating session:", error);
        alert("Failed to create session. See console for details.");
    }
}

// Load all sessions
async function loadSessions() {
    availableSessions = [];
    bookedSessions = [];
    myTutoringSessions = [];
    
    try {
        // Get platform fee for calculations
        const platformFee = await contract.methods.platformFee().call();
        
        // Get all SessionCreated events
        const sessionCreatedEvents = await contract.getPastEvents('SessionCreated', { fromBlock: 0, toBlock: 'latest' });
        
        // Process each session
        for (const event of sessionCreatedEvents) {
            const tokenId = event.returnValues.tokenId;
            const sessionData = await contract.methods.sessions(tokenId).call();
            
            const session = {
                tokenId,
                tutor: sessionData.tutor,
                student: sessionData.student,
                price: sessionData.price,
                duration: sessionData.duration,
                subject: sessionData.subject,
                scheduledTime: sessionData.scheduledTime,
                status: parseInt(sessionData.status)
            };
            
            // Status: 0=Available, 1=Booked, 2=Completed
            if (session.status === 0) {
                availableSessions.push(session);
            } else if (session.status === 1) {
                if (session.student.toLowerCase() === currentAccount.toLowerCase()) {
                    bookedSessions.push(session);
                }
            }
            
            // My tutoring sessions
            if (session.tutor.toLowerCase() === currentAccount.toLowerCase()) {
                myTutoringSessions.push(session);
            }
        }
        
        // Render the sessions
        renderAvailableSessions();
        renderBookedSessions();
        renderMyTutoringSessions();
        
    } catch (error) {
        console.error("Error loading sessions:", error);
    }
}

// Render available sessions
function renderAvailableSessions() {
    availableSessionsEl.innerHTML = '';
    
    if (availableSessions.length === 0) {
        availableSessionsEl.innerHTML = '<p>No available sessions found.</p>';
        return;
    }
    
    availableSessions.forEach(session => {
        const priceInEth = web3.utils.fromWei(session.price, 'ether');
        const durationInHours = session.duration / 60 / 60;
        
        const card = document.createElement('div');
        card.className = 'session-card';
        card.innerHTML = `
            <h3>${session.subject}</h3>
            <p><strong>Tutor:</strong> ${session.tutor.substring(0, 6)}...${session.tutor.substring(session.tutor.length - 4)}</p>
            <p><strong>Price:</strong> ${priceInEth} ETH</p>
            <p><strong>Duration:</strong> ${durationInHours} hours</p>
            <button class="book-btn" data-id="${session.tokenId}" data-price="${session.price}">Book Session</button>
        `;
        
        availableSessionsEl.appendChild(card);
        
        // Add event listener to book button
        card.querySelector('.book-btn').addEventListener('click', (e) => {
            openBookingModal(session.tokenId, session.price, session.subject);
        });
    });
}

// Render booked sessions
function renderBookedSessions() {
    bookedSessionsEl.innerHTML = '';
    
    if (bookedSessions.length === 0) {
        bookedSessionsEl.innerHTML = '<p>You have no booked sessions.</p>';
        return;
    }
    
    bookedSessions.forEach(session => {
        const priceInEth = web3.utils.fromWei(session.price, 'ether');
        const durationInHours = session.duration / 60 / 60;
        const scheduledDate = new Date(session.scheduledTime * 1000).toLocaleString();
        
        const card = document.createElement('div');
        card.className = 'session-card';
        card.innerHTML = `
            <h3>${session.subject}</h3>
            <p><strong>Tutor:</strong> ${session.tutor.substring(0, 6)}...${session.tutor.substring(session.tutor.length - 4)}</p>
            <p><strong>Price:</strong> ${priceInEth} ETH</p>
            <p><strong>Duration:</strong> ${durationInHours} hours</p>
            <p><strong>Scheduled:</strong> ${scheduledDate}</p>
        `;
        
        bookedSessionsEl.appendChild(card);
    });
}

// Render my tutoring sessions
function renderMyTutoringSessions() {
    myTutoringSessionsEl.innerHTML = '';
    
    if (myTutoringSessions.length === 0) {
        myTutoringSessionsEl.innerHTML = '<p>You have no tutoring sessions.</p>';
        return;
    }
    
    myTutoringSessions.forEach(session => {
        const priceInEth = web3.utils.fromWei(session.price, 'ether');
        const durationInHours = session.duration / 60 / 60;
        
        const card = document.createElement('div');
        card.className = 'session-card';
        
        let statusText;
        let actionButton = '';
        
        switch (session.status) {
            case 0:
                statusText = 'Available';
                break;
            case 1:
                statusText = 'Booked';
                const scheduledDate = new Date(session.scheduledTime * 1000).toLocaleString();
                actionButton = `<button class="complete-btn" data-id="${session.tokenId}">Mark Complete</button>`;
                break;
            case 2:
                statusText = 'Completed';
                break;
        }
        
        card.innerHTML = `
            <h3>${session.subject}</h3>
            <p><strong>Status:</strong> ${statusText}</p>
            <p><strong>Price:</strong> ${priceInEth} ETH</p>
            <p><strong>Duration:</strong> ${durationInHours} hours</p>
            ${session.status === 1 ? `<p><strong>Student:</strong> ${session.student.substring(0, 6)}...${session.student.substring(session.student.length - 4)}</p>` : ''}
            ${session.status === 1 ? `<p><strong>Scheduled:</strong> ${new Date(session.scheduledTime * 1000).toLocaleString()}</p>` : ''}
            ${actionButton}
        `;
        
        myTutoringSessionsEl.appendChild(card);
        
        // Add event listener for complete button
        if (session.status === 1) {
            card.querySelector('.complete-btn').addEventListener('click', async (e) => {
                await completeSession(session.tokenId);
            });
        }
    });
}

// Open booking modal
function openBookingModal(tokenId, price, subject) {
    bookingTokenIdEl.value = tokenId;
    
    // Display session details
    const priceInEth = web3.utils.fromWei(price, 'ether');
    sessionDetailsEl.innerHTML = `
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Session Price:</strong> ${priceInEth} ETH</p>
    `;
    
    bookingPriceEl.textContent = priceInEth;
    
    // Calculate platform fee
    contract.methods.platformFee().call().then(fee => {
        const feePercentage = fee / 100;
        const feeAmount = (priceInEth * feePercentage / 100).toFixed(4);
        const total = (parseFloat(priceInEth) + parseFloat(feeAmount)).toFixed(4);
        
        platformFeeEl.textContent = `${feeAmount} ETH (${feePercentage}%)`;
        totalPriceEl.textContent = `${total} ETH`;
    });
    
    bookingModal.style.display = 'block';
}

// Handle book session form submission
async function handleBookSession(event) {
    event.preventDefault();
    
    if (!currentAccount) {
        alert("Please connect your wallet first.");
        return;
    }
    
    const tokenId = bookingTokenIdEl.value;
    const selectedDate = new Date(document.getElementById('bookingDate').value + 'T' + document.getElementById('bookingTime').value);
    const scheduledTime = Math.floor(selectedDate.getTime() / 1000);
    
    // Get session info
    const session = await contract.methods.sessions(tokenId).call();
    const price = session.price;
    
    // Calculate total price with platform fee
    const platformFee = await contract.methods.platformFee().call();
    const feeAmount = new web3.utils.BN(price).mul(new web3.utils.BN(platformFee)).div(new web3.utils.BN(10000));
    const totalPrice = new web3.utils.BN(price).add(feeAmount);
    
    try {
        const gasEstimate = await contract.methods.bookSession(tokenId, scheduledTime)
            .estimateGas({ from: currentAccount, value: totalPrice });
            
        await contract.methods.bookSession(tokenId, scheduledTime)
            .send({ from: currentAccount, value: totalPrice, gas: gasEstimate });
            
        alert("Session booked successfully!");
        bookingModal.style.display = 'none';
        await loadSessions();
        
    } catch (error) {
        console.error("Error booking session:", error);
        alert("Failed to book session. See console for details.");
    }
}

// Complete a session
async function completeSession(tokenId) {
    if (!confirm("Are you sure you want to mark this session as complete?")) {
        return;
    }
    
    try {
        const gasEstimate = await contract.methods.completeSession(tokenId)
            .estimateGas({ from: currentAccount });
            
        await contract.methods.completeSession(tokenId)
            .send({ from: currentAccount, gas: gasEstimate });
            
        alert("Session marked as complete!");
        await loadSessions();
        
    } catch (error) {
        console.error("Error completing session:", error);
        alert("Failed to complete session. See console for details.");
    }
}

// Filter sessions based on search and subject filter
function filterSessions() {
    const searchTerm = sessionSearch.value.toLowerCase();
    const subjectValue = subjectFilter.value.toLowerCase();
    
    // Filter available sessions
    const filteredAvailableSessions = availableSessions.filter(session => {
        const matchesSearch = session.subject.toLowerCase().includes(searchTerm);
        const matchesSubject = subjectValue === '' || session.subject.toLowerCase() === subjectValue;
        return matchesSearch && matchesSubject;
    });
    
    // Re-render with filtered results
    availableSessionsEl.innerHTML = '';
    
    if (filteredAvailableSessions.length === 0) {
        availableSessionsEl.innerHTML = '<p>No sessions match your search criteria.</p>';
        return;
    }
    
    filteredAvailableSessions.forEach(session => {
        const priceInEth = web3.utils.fromWei(session.price, 'ether');
        const durationInHours = session.duration / 60 / 60;
        
        const card = document.createElement('div');
        card.className = 'session-card';
        card.innerHTML = `
            <h3>${session.subject}</h3>
            <p><strong>Tutor:</strong> ${session.tutor.substring(0, 6)}...${session.tutor.substring(session.tutor.length - 4)}</p>
            <p><strong>Price:</strong> ${priceInEth} ETH</p>
            <p><strong>Duration:</strong> ${durationInHours} hours</p>
            <button class="book-btn" data-id="${session.tokenId}" data-price="${session.price}">Book Session</button>
        `;
        
        availableSessionsEl.appendChild(card);
        
        // Add event listener to book button
        card.querySelector('.book-btn').addEventListener('click', (e) => {
            openBookingModal(session.tokenId, session.price, session.subject);
        });
    });
}

// Initialize the app when document is loaded
document.addEventListener('DOMContentLoaded', init);