pragma solidity ^0.4.18;

contract VotingSystem {
    struct Voting {
        string title;
        string description;
        bool complete;
        uint approvalCount;
        uint rejectionCount;
        mapping(address => uint) token;
        mapping(address => bool) voters;
    }
    
    Voting[] public votings;
    address manager;
    mapping(address => bool) voters;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function VotingSystem() public {
        manager = msg.sender;
    }
    
    function getVotingsCount() public view returns (uint) {
        return votings.length;
    }
    
    function createVoting(string title, string description) public restricted {
        Voting memory newVoting = Voting({
            title: title, 
            description: description,
            complete: false,
            approvalCount: 0, 
            rejectionCount: 0
        });
        
        votings.push(newVoting);
    }
    
    function getVotingData(uint index) public view returns (string){
        return votings[index].title;
    }
    
    function enableVoting(address voter) public restricted{
        voters[voter] = true;
    }
    
    function enterVoting(uint index) public payable {
        require(voters[msg.sender]);
        Voting storage voting = votings[index];
        require(!voting.voters[msg.sender]);
        voting.token[msg.sender] = 1;
        voting.voters[msg.sender] = true;
    }
    
    function vote(uint index, bool value) public {
        Voting storage voting = votings[index];
        require(voting.voters[msg.sender]);
        require(voting.token[msg.sender] >= 1);
        
        voting.token[msg.sender] -= 1;
        if (value) {
            voting.approvalCount++;
        } else {
            voting.rejectionCount++;
        }
    }    
}