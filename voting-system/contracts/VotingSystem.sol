pragma solidity ^0.4.18;

contract VotingSystem {
    struct Voting {
        string title;
        string description;
        uint minimumContribution;
        bool complete;
        uint approvalCount;
        uint rejectionCount;
        mapping(address => bool) alreadyVoted;
        mapping(address => bool) voters;
    }
    
    Voting[] public votings;
    address manager;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function VotingSystem() public {
        manager = msg.sender;
    }
    
    function createVoting(string title, string description, uint minimum) public restricted {
        Voting memory newVoting = Voting({
            title: title, 
            description: description,
            minimumContribution: minimum,
            complete: false,
            approvalCount: 0, 
            rejectionCount: 0
        });
        
        votings.push(newVoting);
    }
    
    function getVotingTitle(uint index) public view returns (string){
        return votings[index].title;
    }
    
    function enterVoting(uint index) public payable {
        Voting storage voting = votings[index];
        require(msg.value >= voting.minimumContribution);
        voting.voters[msg.sender] = true;
    }
    
    function vote(uint index, bool value) public {
        Voting storage voting = votings[index];
        require(voting.voters[msg.sender]);
        require(!voting.alreadyVoted[msg.sender]);
        
        voting.alreadyVoted[msg.sender] = true;
        if (value) {
            voting.approvalCount++;
        } else {
            voting.rejectionCount++;
        }
    }
}