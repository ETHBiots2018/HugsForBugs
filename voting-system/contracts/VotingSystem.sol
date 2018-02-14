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
    
    function createVoting(string title, string description, uint minimum) public  {
        // removed require from function, to allow proposed votings to be created
        // we can discuss tomorrow if this is secure enough
        require(msg.sender == manager || checkIfProposal(title,description,minimum));
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
    
    function getVotingData(uint index) public view returns (string) {
        return votings[index].title;
    }
    
    function enableVoting(address voter) public restricted {
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

    //******************** Code for Vote Proposal for non-manager *****************************//

    Proposal[] public proposals;

    struct Proposal {
        string title;
        string description;
        uint minimumContribution;
        uint needApprovals;
        bool complete;
        uint numberOfApprovals;
        mapping(address => bool) alreadyJoined;
    } 

    function createProposal(string title, string description, uint minimum) public {
        Proposal memory newProposal = Proposal({
            title: title, 
            description: description,
            minimumContribution: minimum,
            complete: false,
            needApprovals: 2, 
            numberOfApprovals: 0
        });
        
        proposals.push(newProposal);
    }

    function getProposalCount() public view returns (uint) {
        return proposals.length;
    }

    function getProposalData(uint index) public view returns (string){
        return proposals[index].title;
    }

    function supportProposal(uint index) public payable {
        Proposal storage proposal = proposals[index];
        require(msg.value >= proposal.minimumContribution);
        require(proposal.alreadyJoined[msg.sender] ==false);
        proposal.alreadyJoined[msg.sender] = true;
        proposal.numberOfApprovals++;

        if(checkProposalStatus(index)){
            createVoting(proposal.title, proposal.description, proposal.minimumContribution);
            //TODO: remove Proposal from List?
        }


    }
    
    // issue, how can the proposal be created via restricted createVoting-function
    // Solution: remove restricted and instead do the checking manually.
    function checkProposalStatus(uint index) public view returns (bool) {
        Proposal storage proposal = proposals[index];
        return (proposal.numberOfApprovals >= proposal.needApprovals);
    }


    function checkIfProposal(string title, string description, uint minimum) private view returns (bool) {
        for (uint i = 0; i < proposals.length; i++) {
            Proposal storage proposal = proposals[i];
            if(keccak256(proposal.title)==keccak256(title) && keccak256(proposal.description)==keccak256(description) && proposal.minimumContribution==minimum){
                return true;
            }
        }

        return false;
    }


    //******************** USE THE WithSender FUNCTIONS *****************************//


    function voteFor(uint index, address _for, bool value) public {
    }   

    function transferVote(uint index, address _to) public {
    } 
}