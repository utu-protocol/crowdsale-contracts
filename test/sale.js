const { expect } = require("chai")
const { ethers, config, waffle } = require("@nomiclabs/buidler")
const { deployMockContract } = waffle
const UTUToken = require('./UTUToken.json')

const USDT = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}]

describe("Sale", function() {
	beforeEach(async function() {
		const accounts = (await ethers.getSigners()).reverse()
		this.owner = accounts.pop()
		this.kycAuthority = accounts.pop()
		this.treasury = accounts.pop()
		this.accounts = accounts

		this.factory = await ethers.getContractFactory("Sale")
		this.tetherFactory = await ethers.getContractFactory("TetherMock")
		this.utuMock = await deployMockContract(this.owner, UTUToken.abi)
		this.usdtMock = await this.tetherFactory.deploy(ethers.BigNumber.from("1000000000"))
		this.contract = await this.factory.deploy(
			this.utuMock.address,
			this.usdtMock.address,
			await this.kycAuthority.getAddress(),
			await this.treasury.getAddress(),
			Math.floor(Date.now() / 1000) - 100
		)

		this.minContrib = await this.contract.minContribution()
		this.maxContrib = await this.contract.maxContribution()

	})

	context("Initialize", function() {
		it("should deploy", async function() {
		})
	})

	context("Recovery", async function() {
		it("should not allow recovery to zero address", async function() {
			await expect(this.contract.recoverTokens(ethers.constants.AddressZero, ethers.constants.AddressZero, 1)).to.be.revertedWith('cannot recover to zero address')
		})

		it("should allow recovery of ERC20", async function() {
			await this.utuMock.mock.balanceOf.withArgs(this.contract.address).returns(100)
			await this.utuMock.mock.transfer.returns(true)
			await expect(this.contract.recoverTokens(this.utuMock.address, await this.accounts[0].getAddress(), 100)).to.not.be.reverted
		})

	})

	context("Tether", function() {
		it("should approve", async function() {
			await this.usdtMock.approve(this.contract.address, ethers.BigNumber.from("0"))
		})

		it("should transfer", async function() {
			await this.usdtMock.transfer(this.contract.address, ethers.BigNumber.from("1"))
		})
	})

	context("Buy", function() {
		beforeEach(async function() {
			this.contrib = await this.accounts[0]
			this.contribAddr = await this.contrib.getAddress()
			const addr = ethers.utils.arrayify(this.contribAddr)
			const msg = ethers.utils.arrayify(ethers.utils.keccak256(addr))
			this.validSig = await this.kycAuthority.signMessage(msg)

			await this.usdtMock.issue(this.contribAddr, this.maxContrib);
		})

		it("should succeed with min contrib", async function() {
			const toBuy = this.minContrib
			// Minimum contribution is 200 USDT. At 0.04 USDT per UTU token they
			// should get 5000 UTU token.
			const out = ethers.utils.parseEther('5000.0')

			await this.utuMock.mock.mint.returns()
			await this.usdtMock.connect(this.contrib).approve(this.contract.address, toBuy);

			await expect(
				this.contract.connect(this.contrib).buy(this.contribAddr, toBuy, this.validSig)
			).to.emit(this.contract, 'Contributed')
			.withArgs(this.contribAddr, this.contribAddr, out);
		})

		it("should succeed with weird contrib", async function() {
			const toBuy = this.minContrib.add(123)
			// Minimum contribution is 200 USDT. At 0.04 USDT per UTU token they
			// should get 5000 UTU token.
			const out = ethers.utils.parseEther('5000.003075000000000000')

			await this.utuMock.mock.mint.returns()
			await this.usdtMock.connect(this.contrib).approve(this.contract.address, toBuy);

			await expect(
				this.contract.connect(this.contrib).buy(this.contribAddr, toBuy, this.validSig)
			).to.emit(this.contract, 'Contributed')
			.withArgs(this.contribAddr, this.contribAddr, out);
		})


		it("should succeed with max contrib", async function() {
			const toBuy = this.maxContrib
			// Maximum contribution is 500 USDT. At 0.04 USDT per UTU token they
			// should get 12500 UTU token.
			const out = ethers.utils.parseEther('12500.0')

			await this.utuMock.mock.mint.returns()
			await this.usdtMock.connect(this.contrib).approve(this.contract.address, toBuy);

			await expect(
				this.contract.connect(this.contrib).buy(this.contribAddr, toBuy, this.validSig)
			).to.emit(this.contract, 'Contributed')
			.withArgs(this.contribAddr, this.contribAddr, out);
		})

		it("should fail if already bought", async function() {
			const toBuy = this.minContrib

			await this.utuMock.mock.mint.returns()
			await this.usdtMock.connect(this.contrib).approve(this.contract.address, toBuy);

			await this.contract.connect(this.contrib).buy(this.contribAddr, toBuy, this.validSig)
			await expect(
				this.contract.connect(this.contrib).buy(this.contribAddr, toBuy, this.validSig)
			).to.be.revertedWith('UTU: already bought')
		})

		it("should fail if contribution too small", async function() {
			await expect(this.contract.buy(await this.contrib.getAddress(), this.minContrib.sub(1) , this.validSig)).to.be.revertedWith('UTU: below individual floor')
		})

		it("should fail if contribution too big", async function() {
			await expect(this.contract.buy(await this.contrib.getAddress(), this.maxContrib.add(1) , this.validSig)).to.be.revertedWith('UTU: above individual cap')
		})

	})

	context("Checkout", function() {
		beforeEach(async function() {
			this.contrib = await this.accounts[0]
			this.contribAddr = await this.contrib.getAddress()
			const addr = ethers.utils.arrayify(this.contribAddr)
			const msg = ethers.utils.arrayify(ethers.utils.keccak256(addr))
			this.validSig = await this.kycAuthority.signMessage(msg)
		})

		it("should fail if contribution too small", async function() {
			await expect(this.contract.buy(await this.contrib.getAddress(), this.minContrib.sub(1) , this.validSig)).to.be.revertedWith('UTU: below individual floor')
		})


	})

});

