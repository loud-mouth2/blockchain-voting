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
});