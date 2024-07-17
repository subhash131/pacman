// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PacmanBetting {

    struct Bet {
        uint256 amount;
        bool playerWon;
        bool claimed;
    }

    mapping(address => Bet) public bets;
    address public gameOwner;
    bool private locked;

    event BetPlaced(address indexed player, uint256 amount);
    event GameEnded(address indexed player, bool playerWon, uint256 amount);
    event BetClaimed(address indexed player, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == gameOwner, "Only the owner can call this function");
        _;
    }

    modifier noReentrant() {
        require(!locked, "Reentrant call.");
        locked = true;
        _;
        locked = false;
    }

    constructor() {
        gameOwner = msg.sender;
    }


    function placeBet() external payable {
        require(msg.value > 0, "Bet amount must be greater than zero");
        bets[msg.sender].amount = msg.value;
        bets[msg.sender].playerWon = false;
        bets[msg.sender].claimed = false;
        emit BetPlaced(msg.sender, msg.value);
    }

    function endGame(address player,  bool playerWon) external onlyOwner {
        Bet storage bet = bets[player];
        require(!bet.claimed, "Bet already claimed");

        bet.playerWon = playerWon;

        if(!playerWon){
            bets[player].amount = 0;
        }

        emit GameEnded(player, playerWon, bet.amount);
    }


    function claimWinnings() external noReentrant payable {
        Bet storage bet = bets[msg.sender];
        require(!bet.claimed, "Winnings already claimed");
        require(bet.playerWon, "Player did not win");

        bet.claimed = true;
        uint256 payout = bet.amount * 2;
        require(address(this).balance >= payout, "Insufficient funds sent");

        // Transfer the payout amount to the player
        payable(msg.sender).transfer(payout);

        emit BetClaimed(msg.sender, payout);
    }


    function withdrawUnclaimedFunds() external noReentrant onlyOwner {
        uint256 unclaimedFunds = address(this).balance;
        payable(gameOwner).transfer(unclaimedFunds);
    }

    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    function fundContract() external payable {}

}
