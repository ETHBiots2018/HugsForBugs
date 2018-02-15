pragma solidity ^0.4.18;

import "./VotingSystem.sol";
import "./TokenERC20.sol";

contract ProposalSystem {
    
    struct Proposal {
        string title;
        string description;
        address manager;
        uint needApprovals;
        bool complete;
        uint numberOfApprovals;
        mapping(address => bool) alreadyJoined;
        uint endTime;
    } 
    
    VotingSystem private vSytem;
    Proposal[] private proposals;
    
    function ProposalSystem(address _vsystem) public {
        vSytem = VotingSystem(_vsystem);
    }
    
    function createProposal(string title, string description, uint minimum, uint duration) public {
        
        //overflow check
        require(now <= now + duration);

        // create proposal instance
        Proposal memory newProposal = Proposal({
            title: title,
            description: description,
            manager: msg.sender,
            complete: false,
            needApprovals: minimum,
            numberOfApprovals: 0,
            endTime: now + duration
        });
        
        proposals.push(newProposal);
    }
    
    function createVotingForProposal(uint _index, uint duration, bool _transferVoteAllowed) public payable {
        Proposal storage proposal = proposals[_index];
        require(now <= proposal.endTime);
        //overflow check
        require(now <= now + duration);
        
        require(proposal.manager == msg.sender);
        require(proposal.numberOfApprovals >= proposal.needApprovals);
        
        vSytem.createVoting(proposal.title, proposal.description, duration, _transferVoteAllowed);
    }

    function getProposalCount() public view returns (uint) {
        return proposals.length;
    }

    function supportProposal(uint index) public {
        Proposal storage proposal = proposals[index];
        require(now <= proposal.endTime);
        
        require(!proposal.alreadyJoined[msg.sender]);
        
        proposal.alreadyJoined[msg.sender] = true;
        proposal.numberOfApprovals++;
    }
    
    function checkProposalStatus (uint index) public view returns (bool) {
        Proposal storage proposal = proposals[index];
        require(now <= proposal.endTime);

        bool result = proposal.numberOfApprovals > proposal.needApprovals;
        return result;
    }

    function showProposalApproval (uint index) public view returns (uint){
        Proposal storage proposal = proposals[index];
        return proposal.numberOfApprovals;
    }

    function showProposalDeadline (uint index) public view returns (uint){
        Proposal storage proposal = proposals[index];
        require(now <= proposal.endTime);
        return (proposal.endTime-now);
    }

    function showProposalApprovalNeeded (uint index) public view returns (uint){
        Proposal storage proposal = proposals[index];
        return proposal.needApprovals;
    }
}