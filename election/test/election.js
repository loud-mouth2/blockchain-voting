var Election = artifacts.require("./Election.sol");

contract("Election", function(accounts)
{
	var electionInstance;

	it("initialies with 2 candidates", function()
	{
		return Election.deployed().then(function(instance)
		{
			return instance.candidatesCount();
		}).then(function(count)
		{
			assert.equal(count, 2);
		});
	});


	it("it initialises the candidates with the correct values", function()
	{
		return Election.deployed().then(function(instance)
		{
			electionInstance = instance;
			return electionInstance.candidates(1);
		}).then(function(candidate)
		{
			assert.equal(candidate[0], 1, "coorect id 1");
			assert.equal(candidate[1], "Candidate 1", "coorect name 1");
			assert.equal(candidate[2], 0, "coorect votecount 1");
			return electionInstance.candidates(2);

		}).then(function(candidate)
		{
			assert.equal(candidate[0], 2, "coorect id 2");
			assert.equal(candidate[1], "Candidate 2", "coorect name 2");
			assert.equal(candidate[2], 0, "coorect votecount 2");
		});
	});

	it("allows a voter to cast vote", function()
	{
		return Election.deployed().then(function(instance){
			electionInstance = instance;
			candidateId=1;
			return electionInstance.vote(candidateId, {from : accounts[0]});
		}).then(function(receipt){
			return electionInstance.voters(accounts[0]);
		}).then(function(voted){
			assert(voted, "the voter was marked as voted");
			return electionInstance.candidates(1);
		}).then(function(candidate){
			var vc = candidate[2];
			assert.equal(vc, 1, "yes the vote count has been incremented");
		});
	});

	it("throws exception for double voting", function(){
		return Election.deployed().then(function(instance){
			electionInstance = instance;
			return electionInstance.candidates(1);
		}).then(function(candidate){
			var vc = candidate[2];
			assert.equal(vc, 1, "hellooooooo"); //candidate 1 already has one vote given by mr. accounts[0];
			return electionInstance.vote(1, {from : accounts[0]}); //second attempt from account 1
		}).then(assert.fail).catch(function(error){
			assert(error.message.indexOf('revert') >= 0, "no errorrr"); // error message definitely displays on second attempt from account 1
			return electionInstance.candidates(1);
		}).then(function(candidate){
			var vc = candidate[2];
			assert.equal(vc, 1, "vote count for candidate one is still 1");
			return electionInstance.candidates(2);
		}).then(function(candidate2){
			var vc = candidate2[2];
			assert.equal(vc, 0, "vote count for candidate two has not been incremented even once so far");
		});
	});


	it("throws exception for invalid candidate", function(){
		return Election.deployed().then(function(instance){
			electionInstance = instance;
			return electionInstance.candidates(1);
		}).then(function(candidate){
			var vc = candidate[2];
			assert.equal(vc, 1, "hellooooooo"); //candidate 1 already has one vote given by mr. accounts[0];
			return electionInstance.vote(99, {from : accounts[1]}); //first attempt from accounts[1], BUT they are voting for candidate 99, who does not exist
		}).then(assert.fail).catch(function(error){
			assert(error.message.indexOf('revert') >= 0, "no errorrr"); // error message definitely displays on second attempt from account 1
			return electionInstance.candidates(1);
		}).then(function(candidate){
			var vc = candidate[2];
			assert.equal(vc, 1, "vote count for candidate one is still 1");
			return electionInstance.candidates(2);
		}).then(function(candidate2){
			var vc = candidate2[2];
			assert.equal(vc, 0, "vote count for candidate two has not been incremented even once so far");
		});
	});


});


/*



*/
