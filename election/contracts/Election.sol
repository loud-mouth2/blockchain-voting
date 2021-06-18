pragma solidity ^0.5.16;

contract Election
{
	//model candidate
	struct Candidate {
		uint id;
		string name;
		uint voteCount;
	}

	//store candidates
	//fetch candidates
	mapping(uint => Candidate) public candidates;
	mapping(address => bool) public voters;



	//store candidates count

	uint public candidatesCount; 

	constructor () public{
		addCandidate("Candidate 1");
		addCandidate("Candidate 2");
	}

	function addCandidate(string memory _name) private {
		candidatesCount ++;
		candidates[candidatesCount] = Candidate(candidatesCount,  _name, 0);
	}

	function vote(uint _candidateId) public {
		require(!voters[msg.sender]);
		require(0<_candidateId && _candidateId<=candidatesCount);

		voters[msg.sender]=true;
		candidates[_candidateId].voteCount++;
	}

}