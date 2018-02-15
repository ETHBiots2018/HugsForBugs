pragma solidity ^0.4.18;

import "./TokenERC20.sol";

contract VotingSystem {
    
    struct Voting {
        string title;
        string description;
        bool complete;
        uint approvalCount;
        uint rejectionCount;
        TokenERC20 token;
        mapping(address => bool) voters;
    }
    

    Voting[] public votings;
    address manager;
    uint votersCount;
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
    
    function createVoting(string title, string description) public {
        // removed require from function, to allow proposed votings to be created
        // we can discuss tomorrow if this is secure enough
        require(msg.sender == manager || checkIfProposal(title,description));
        
        TokenERC20 newToken = new TokenERC20(votersCount, "VoteCoin", "VTC");
        Voting memory newVoting = Voting({
            title: title, 
            description: description,
            complete: false,
            approvalCount: 0, 
            rejectionCount: 0, 
            token: newToken
        });
        
        votings.push(newVoting);
    }
    
    function enableVoting(address voter) public restricted {
        votersCount++;
        voters[voter] = true;
    }
    
    function enterVoting(uint index) public payable {
        require(voters[msg.sender]);
        Voting storage voting = votings[index];
        require(!voting.voters[msg.sender]);
        voting.token.transfer(msg.sender, 1);
        voting.voters[msg.sender] = true;
    }
    
    function vote(uint index, bool value) public {
        Voting storage voting = votings[index];
        
        // right and balance requirements
        uint256 currentBalance = voting.token.getBalance(msg.sender);
        require(voting.voters[msg.sender]);
        require(currentBalance >= 1);
        
        // update token
        bool success = voting.token.burnWtihSender(msg.sender, 1);
        require(success);

        // update voting counter
        if (value) {
            voting.approvalCount++;
        } else {
            voting.rejectionCount++;
        }
    }
    
    function voteFor(uint _index, address _for, bool _value) public {
        Voting storage voting = votings[_index];
        
        // check rights and balance
        uint256 currentBalance = voting.token.getBalance(_for);
        require(voting.voters[_for]);
        require(voting.voters[msg.sender]);
        require(currentBalance >= 1);
        
        // update token
        bool success = voting.token.burnFromWithSender(msg.sender, _for, 1);
        require(success);

        // update voting counter
        if (_value) {
            voting.approvalCount++;
        } else {
            voting.rejectionCount++;
        }
    }   

    /**
     * Allows `_to` to spend a vote token on your behalf
     *
     * @param _index voting index for vote transfer
     * @param _to address authorized to spend vote
     */
     
    function transferVote(uint _index, address _to) public {
        Voting storage voting = votings[_index];
        
        // check rights and balance
        uint256 currentBalance = voting.token.getBalance(msg.sender);
        require(voting.voters[_to]);
        require(voting.voters[msg.sender]);
        require(currentBalance >= 1);
        
        // set transfer/allowance
        voting.token.approveWithSender(msg.sender, _to, 1);
    } 

    //******************** Code for Vote Proposal for non-manager *****************************//

    Proposal[] public proposals;

    struct Proposal {
        string title;
        string description;
        uint needApprovals;
        bool complete;
        uint numberOfApprovals;
        mapping(address => bool) alreadyJoined;
    } 

    function createProposal(string title, string description) public {
        Proposal memory newProposal = Proposal({
            title: title, 
            description: description,
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
        require(proposal.alreadyJoined[msg.sender] ==false);
        proposal.alreadyJoined[msg.sender] = true;
        proposal.numberOfApprovals++;

        if(checkProposalStatus(index)){
            createVoting(proposal.title, proposal.description);
            //TODO: remove Proposal from List?
        }
    }
    
    // issue, how can the proposal be created via restricted createVoting-function
    // Solution: remove restricted and instead do the checking manually.
    function checkProposalStatus(uint index) public view returns (bool) {
        Proposal storage proposal = proposals[index];
        return (proposal.numberOfApprovals >= proposal.needApprovals);
    }


    function checkIfProposal(string title, string description) private view returns (bool) {
        for (uint i = 0; i < proposals.length; i++) {
            Proposal storage proposal = proposals[i];
            if(keccak256(proposal.title)==keccak256(title) && keccak256(proposal.description)==keccak256(description)){
                return true;
            }
        }

        return false;
    }
    
}