const { expect } = require("chai");
const { ethers, config, waffle } = require("@nomiclabs/buidler");
const { deployMockContract } = waffle;
const UTUToken = require('./UTUToken.json');
const { increaseTime } = require('./utils.js');

describe("Distributor", function() {
	beforeEach(async function() {
		const accounts = (await ethers.getSigners()).reverse();
		this.owner = accounts.pop();
		this.accounts = accounts;

		let start = Math.floor(Date.now() / 1000) - 1;
		this.factory = await ethers.getContractFactory("Distributor");
		this.utuMock = await deployMockContract(this.owner, UTUToken.abi);
		this.contract = await this.factory.deploy(
			this.utuMock.address,
			ethers.utils.parseEther("27600000.00"),
			start
		);

		this.contributors = [];
		this.balances = [];

		for(let i = 0; i < 250; i++) {
			this.contributors.push(ethers.Wallet.createRandom().address);
			this.balances.push(ethers.utils.parseEther("1"));
		}
	})

	context("Assign", async function() {
		it("should run out of gas with full arrays", async function() {
			await this.utuMock.mock.mint.returns();
			try {
				await this.contract.assign(this.contributors, this.balances);
				expect(false).to.be.true;
			} catch (err) {
				expect(err.message).to.be.eq('Transaction run out of gas');
			}
		})

		it("should not run out of gas with half size arrays", async function() {
			const firstContribs = this.contributors.slice(0, 125);
			const firstBalances = this.balances.slice(0, 125);
			const secondContribs = this.contributors.slice(125, 250);
			const secondBalances = this.balances.slice(125, 250);

			await this.contract.assign(firstContribs, firstBalances);
			await this.contract.assign(secondContribs, secondBalances);

			expect((await this.contract.contribs(124))[0]).to.be.eq(this.contributors[124]);
			expect((await this.contract.contribs(124))[1]).to.be.eq(this.balances[124]);
			expect((await this.contract.contribs(249))[0]).to.be.eq(this.contributors[249]);
			expect((await this.contract.contribs(249))[1]).to.be.eq(this.balances[249]);
		})

		it("should revert if trying to mint too much", async function() {
			const firstContribs = this.contributors.slice(0, 125);
			const firstBalances = this.balances.slice(0, 125).map(v => { return v.mul(1000000)});
			const secondContribs = this.contributors.slice(125, 250);
			const secondBalances = this.balances.slice(125, 250);

			await expect(this.contract.assign(firstContribs, firstBalances)).to.be.revertedWith("SafeMath: subtraction overflow");
		})
	})

	context("Distribute", async function() {
		it("should distribute", async function() {
			const firstContribs = this.contributors.slice(0, 125);
			const firstBalances = this.balances.slice(0, 125);
			const secondContribs = this.contributors.slice(125, 250);
			const secondBalances = this.balances.slice(125, 250);

			await this.contract.assign(firstContribs, firstBalances);
			await this.contract.assign(secondContribs, secondBalances);
			await this.contract.assignDone();

			await this.utuMock.mock.mint.returns();

			await expect(this.contract.distribute(124)).to.not.be.reverted;
			await expect(this.contract.distribute(249)).to.not.be.reverted;
		})
	})

});


