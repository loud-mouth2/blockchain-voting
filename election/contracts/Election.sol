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

}