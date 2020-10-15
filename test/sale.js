const { expect } = require("chai");
const { ethers, config, waffle } = require("@nomiclabs/buidler");
const { deployMockContract } = waffle;
const UTUToken = require('./UTUToken.json');
const { increaseTime } = require('./utils.js');

const USDT = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}]

const aDay = 60 * 60 * 24;
const twoDays = aDay * 2;
const anHour = 60 * 60;

describe("Sale", function() {
	beforeEach(async function() {
		const accounts = (await ethers.getSigners()).reverse();
		this.owner = accounts.pop();
		this.kycAuthority = accounts.pop();
		this.treasury = accounts.pop();
		this.accounts = accounts;

		let start = Date.now() + aDay * 1000;
		this.factory = await ethers.getContractFactory("Sale");
		this.tetherFactory = await ethers.getContractFactory("TetherMock");
		this.utuMock = await deployMockContract(this.owner, UTUToken.abi);
		this.usdtMock = await this.tetherFactory.deploy(ethers.BigNumber.from("1000000000"));
		this.contract = await this.factory.deploy(
			this.utuMock.address,
			this.usdtMock.address,
			await this.kycAuthority.getAddress(),
			await this.treasury.getAddress(),
			Math.floor(start / 1000)
		);

		this.minContrib = await this.contract.minContribution();
		this.maxContrib = await this.contract.maxContribution();
	})

	context("Recovery", async function() {
		it("should not allow recovery to zero address", async function() {
			await expect(this.contract.recoverTokens(ethers.constants.AddressZero, ethers.constants.AddressZero, 1)).to.be.revertedWith('cannot recover to zero address');
		})

		it("should allow recovery of ERC20", async function() {
			await this.utuMock.mock.balanceOf.withArgs(this.contract.address).returns(100);
			await this.utuMock.mock.transfer.returns(true);
			await expect(this.contract.recoverTokens(this.utuMock.address, await this.accounts[0].getAddress(), 100)).to.not.be.reverted;
		})

	})

	context("Tether", function() {
		it("should approve", async function() {
			await this.usdtMock.approve(this.contract.address, ethers.BigNumber.from("0"));
		})

		it("should transfer", async function() {
			await this.usdtMock.transfer(this.contract.address, ethers.BigNumber.from("1"));
		})
	})

	context("Buy#success", function() {
		beforeEach(async function() {
			this.contrib = await this.accounts[0];
			this.contribAddr = await this.contrib.getAddress();
			const addr = ethers.utils.arrayify(this.contribAddr);
			const msg = ethers.utils.arrayify(ethers.utils.keccak256(addr));
			this.validSig = await this.kycAuthority.signMessage(msg);

			await this.usdtMock.issue(this.contribAddr, this.maxContrib.mul(10));
		})

		before(async function() {
			await increaseTime(aDay);
		})

		after(async function() {
			await increaseTime(-aDay);
		})

		it("should succeed with min contrib", async function() {
			const toBuy = this.minContrib;
			// Minimum contribution is 200 USDT. At 0.04 USDT per UTU token they
			// should get 5000 UTU token.
			const out = ethers.utils.parseEther('5000.0');

			await this.usdtMock.connect(this.contrib).approve(this.contract.address, toBuy);

			await expect(
				this.contract.connect(this.contrib).buy(this.contribAddr, toBuy, this.validSig)
			).to.emit(this.contract, 'Contributed')
				.withArgs(this.contribAddr, this.contribAddr, out);
		})

		it("should succeed with weird contrib", async function() {
			const toBuy = this.minContrib.add(123);
			// Minimum contribution is 200 USDT. At 0.04 USDT per UTU token they
			// should get 5000 UTU token.
			const out = ethers.utils.parseEther('5000.003075000000000000');

			await this.usdtMock.connect(this.contrib).approve(this.contract.address, toBuy);

			await expect(
				this.contract.connect(this.contrib).buy(this.contribAddr, toBuy, this.validSig)
			).to.emit(this.contract, 'Contributed')
				.withArgs(this.contribAddr, this.contribAddr, out);
		})

		it("should succeed with max contrib before cap lift", async function() {
			const toBuy = this.maxContrib;
			// Maximum contribution is 1242 USDT. At 0.04 USDT per UTU token they
			// should get 31050 UTU token.
			const out = ethers.utils.parseEther('31050.0');

			await this.usdtMock.connect(this.contrib).approve(this.contract.address, toBuy);

			await expect(
				this.contract.connect(this.contrib).buy(this.contribAddr, toBuy, this.validSig)
			).to.emit(this.contract, 'Contributed')
				.withArgs(this.contribAddr, this.contribAddr, out);
		})

		it("should succeed with more than maxContrib after cap lift", async function() {
			await increaseTime(anHour);

			const toBuy = this.maxContrib.mul(2);
			// Maximum contribution is 1242 USDT. At 0.04 USDT per UTU token they
			// should get 31050 UTU token.
			const out = ethers.utils.parseEther('31050.0').mul(2);

			await this.usdtMock.connect(this.contrib).approve(this.contract.address, toBuy);

			await expect(
				this.contract.connect(this.contrib).buy(this.contribAddr, toBuy, this.validSig)
			).to.emit(this.contract, 'Contributed')
				.withArgs(this.contribAddr, this.contribAddr, out);

			await increaseTime(-anHour);
		})


		it("should succeed with one before cap lift and one after", async function() {

			const toBuy = this.maxContrib;
			// Maximum contribution is 1242 USDT. At 0.04 USDT per UTU token they
			// should get 31050 UTU token.
			const out = ethers.utils.parseEther('31050.0');

			await this.usdtMock.connect(this.contrib).approve(this.contract.address, toBuy.mul(2));

			await expect(
				this.contract.connect(this.contrib).buy(this.contribAddr, toBuy, this.validSig)
			).to.emit(this.contract, 'Contributed')
				.withArgs(this.contribAddr, this.contribAddr, out);
			await increaseTime(anHour);

			await expect(
				this.contract.connect(this.contrib).buy(this.contribAddr, toBuy, this.validSig)
			).to.emit(this.contract, 'Contributed')
				.withArgs(this.contribAddr, this.contribAddr, out);

			await increaseTime(-anHour);
		})

		it("should succeed with multiple buys after cap lift", async function() {
			await increaseTime(anHour);

			const toBuy = this.maxContrib;
			// Maximum contribution is 1242 USDT. At 0.04 USDT per UTU token they
			// should get 31050 UTU token.
			const out = ethers.utils.parseEther('31050.0');

			await this.usdtMock.connect(this.contrib).approve(this.contract.address, toBuy.mul(2));

			await expect(
				this.contract.connect(this.contrib).buy(this.contribAddr, toBuy, this.validSig)
			).to.emit(this.contract, 'Contributed')
				.withArgs(this.contribAddr, this.contribAddr, out);

			await expect(
				this.contract.connect(this.contrib).buy(this.contribAddr, toBuy, this.validSig)
			).to.emit(this.contract, 'Contributed')
				.withArgs(this.contribAddr, this.contribAddr, out);

			await increaseTime(-anHour);
		})

	})

	it("should not sell more than available", async function() {
		this.contrib = await this.accounts[0];
		this.contribAddr = await this.contrib.getAddress();
		const addr = ethers.utils.arrayify(this.contribAddr);
		const msg = ethers.utils.arrayify(ethers.utils.keccak256(addr));
		this.validSig = await this.kycAuthority.signMessage(msg);

		const toBuy = (await this.contract.usdtAvailable()).add(100);
		await this.usdtMock.issue(this.contribAddr, toBuy);
		const before = await this.usdtMock.balanceOf(this.contribAddr);

		await increaseTime(aDay);
		await increaseTime(anHour);

		//const out = await this.contract.usdtToUTU(toBuy.sub(100));
		const out = await this.contract.maxUTU();

		await this.usdtMock.connect(this.contrib).approve(this.contract.address, toBuy);

		await expect(
			this.contract.connect(this.contrib).buy(this.contribAddr, toBuy, this.validSig)
		).to.emit(this.contract, 'Contributed')
			.withArgs(this.contribAddr, this.contribAddr, out);

		expect(await this.usdtMock.balanceOf(this.contribAddr)).to.be.equal(before.sub(await this.contract.maxUSDT()));

		await increaseTime(-anHour);
		await increaseTime(-aDay);
	})

	context("Buy#Failure", function() {
		beforeEach(async function() {
			this.contrib = await this.accounts[0];
			this.contribAddr = await this.contrib.getAddress();
			const addr = ethers.utils.arrayify(this.contribAddr);
			const msg = ethers.utils.arrayify(ethers.utils.keccak256(addr));
			this.validSig = await this.kycAuthority.signMessage(msg);

			await this.usdtMock.issue(this.contribAddr, this.maxContrib.mul(10));
		})

		before(async function() {
			await increaseTime(aDay);
		})

		after(async function() {
			await increaseTime(-aDay);
		})

		it("should fail if sale not active", async function() {
			await increaseTime(-aDay);
			await expect(this.contract.buy(await this.contrib.getAddress(), this.minContrib, this.validSig)).to.be.revertedWith('UTU: sale is not active');
			await increaseTime(aDay);
		})

		it("should fail if not enough USDT approval", async function() {
			const toBuy = this.maxContrib;

			await this.usdtMock.connect(this.contrib).approve(this.contract.address, toBuy.sub(1));

			await expect(
				this.contract.connect(this.contrib).buy(this.contribAddr, toBuy, this.validSig)
			).to.be.reverted;
		})

		it("should fail if already bought before cap lifted", async function() {
			const toBuy = this.minContrib;

			await this.usdtMock.connect(this.contrib).approve(this.contract.address, toBuy);

			await this.contract.connect(this.contrib).buy(this.contribAddr, toBuy, this.validSig);
			await expect(
				this.contract.connect(this.contrib).buy(this.contribAddr, toBuy, this.validSig)
			).to.be.revertedWith('UTU: already bought');
		})

		it("should fail if contribution too small", async function() {
			await expect(this.contract.buy(await this.contrib.getAddress(), this.minContrib.sub(1) , this.validSig)).to.be.revertedWith('UTU: below individual floor');
		})

		it("should fail if contribution too big before cap lifted", async function() {
			await expect(this.contract.buy(await this.contrib.getAddress(), this.maxContrib.add(1) , this.validSig)).to.be.revertedWith('UTU: above individual cap');
		})
	})

	// TODO: MORE TESTS
	context("Checkout", function() {
		before(async function() {
			await increaseTime(aDay);
		})

		after(async function() {
			await increaseTime(-aDay);
		})

		context("Public", function() {
			before(async function() {
				await increaseTime(anHour);
			})

			after(async function() {
				await increaseTime(-anHour);
			})
			beforeEach(async function() {
				this.contrib = await this.accounts[0];
				this.contribAddr = await this.contrib.getAddress();
				const addr = ethers.utils.arrayify(this.contribAddr);
				const msg = ethers.utils.arrayify(ethers.utils.keccak256(addr));
				this.validSig = await this.kycAuthority.signMessage(msg);

				this.toBuy = this.maxContrib;
				await this.usdtMock.issue(this.contribAddr, this.toBuy.mul(2));
				await this.usdtMock.connect(this.contrib).approve(this.contract.address, this.toBuy.mul(2));

				await this.contract.connect(this.contrib).buy(this.contribAddr, this.toBuy, this.validSig);
				await this.contract.connect(this.contrib).buy(this.contribAddr, this.toBuy, this.validSig);
			})

			it("should fail if sale not over", async function() {
				await expect(this.contract.checkoutPublic(this.contribAddr)).to.be.revertedWith('UTU: can only check out after sale');
			})

			it("should succeed if sale over", async function() {
				await increaseTime(twoDays);
				await this.utuMock.mock.mint.returns();
				await expect(
					this.contract.checkoutPublic(this.contribAddr)
				).to.emit(this.contract, 'CheckOut')
					.withArgs(this.contribAddr, await this.contract.usdtToUTU(this.toBuy.mul(2)), true);
				await increaseTime(-twoDays);
			})

			it("should fail if already checked out", async function() {
				await increaseTime(twoDays);
				await this.utuMock.mock.mint.returns();

				await expect(
					this.contract.checkoutPublic(this.contribAddr)
				).to.emit(this.contract, 'CheckOut')
					.withArgs(this.contribAddr, await this.contract.usdtToUTU(this.toBuy.mul(2)), true);

				await expect(
					this.contract.checkoutPublic(this.contribAddr)
				).to.be.revertedWith('UTU: already checked out');
				await increaseTime(-twoDays);
			})

		})

		context("Private", function() {
			beforeEach(async function() {
				this.buyers = await Promise.all(this.accounts.map(async a => { return await a.getAddress()}));
				this.balances = this.buyers.map(h => { return 1 });

				await this.contract.assignPrivate(this.buyers, this.balances);
			})

			it("should fail if private already assigned", async function() {
				await expect(this.contract.assignPrivate([], [])).to.be.revertedWith('UTU: already assigned private sale');
			})

			it("should fail before sale is over", async function() {
				await expect(this.contract.checkoutPrivate(this.buyers[0])).to.be.revertedWith('UTU: can only check out after sale');
			})

			it("should fail for address without allocation", async function() {
				await increaseTime(twoDays);
				await expect(this.contract.checkoutPrivate(await this.owner.getAddress())).to.be.revertedWith('UTU: no private allocation');
				await increaseTime(-twoDays);
			})

			it("should succeed for address with allocation", async function() {
				await increaseTime(twoDays);
				await this.utuMock.mock.mint.returns();

				await expect(
					this.contract.checkoutPrivate(this.buyers[0])
				).to.emit(this.contract, 'CheckOut')
					.withArgs(this.buyers[0], this.balances[0], false);
				await increaseTime(-twoDays);
			})

			it("should fail to checkout twice", async function() {
				await increaseTime(twoDays);
				await this.utuMock.mock.mint.returns();

				await expect(
					this.contract.checkoutPrivate(this.buyers[0])
				).to.emit(this.contract, 'CheckOut')
					.withArgs(this.buyers[0], this.balances[0], false);

				await expect(this.contract.checkoutPrivate(this.buyers[0])).to.be.revertedWith('UTU: already checked out');
				await increaseTime(-twoDays);
			})

		})

	})

	it("should assign private sale", async function () {
		const buyers = [
			"0x22eD6B152469c0dE62c73483eA7175CCFC9F7dee", // 326086.957
			"0xaCC383C1f6DE96441cdeEbb761D7c6F8123E700f", // 434782.609
			"0xeD82c8F1b85D37f0d509fC7d5C78ECC52229fe21", // 434782.609
			"0x487a2E1ce5C2be9eDbeeE7CA4277ED9ccB25da25", // 543478.261
			"0x79Fc5080A87cD0204d413f8ABF058411Be11118F", // 543478.261
			"0x78068A28b5aAa09301Be5a03De81552F1D1F4a31", // 543478.261
			"0xC2Dc950C78951f3Bda6aBDbf5234BeC1978e6cCB", // 1086956.522
			"0x4a2cfa628cbb67c2b956f88391b3bf25a56df38c", // 1086956.52
			"0xd74057888ed229b1fbf485c6099b4f19b3f2f59b", // 543478.26
			"0x7d1b68ae2665b99369e39e6bc722c127f24efeb7", // 493842.66
			"0xF4F1f0e3Bb56822D8316473261170b365496668E", // 961538.46
			"0xe036a04c9c16cAC5D5C951Fb0c73fa932175C5D4", // 125418.06
			"0x0Ed67dAaacf97acF041cc65f04A632a8811347fF", // 108695.65
			"0x5EFCd3D4c97Be7372cde546202423BaCbB5163dc", // 1086956.52
			"0x5182531E3EbEB35AF19E00fa5DE03A12d46eBa72", // 192307.69
			"0xe6735CD72B819c2Cc3CdB710a123f8FE32E596AD", // 1923076.92
			"0xA08432f1a67CaeFD4BB79B8BD608b003590FBAC9", // 19230.77
			"0xb759E1E0cFaAf70Ba9f5538F834BA9f449Cc7AdC", // 96153.85
			"0xc451A2024a6C2622194F949EC914bF7492Fea8f1", // 961538.46
			"0x60fF54a44835fcC96121Cb250E76bCA420489Fc0", // 346153.85
			"0xeC872737c7fB00eE0f3Cd52f36f96a43D6D4f61E", // 961538.46
			"0x450fc6d014afcde3297de9575a8216a915220834", // 14423.08
			"0x1E2Ca40CBD620A94acfaf0eBEFe077E479bD1a4f", // 96153.85
			"0x1257b6871BFca1DA593fF5586e73eB1731b494fc", // 20000
			"0xA947960739C6cb01Be33F10D3c34bE49baDe1B6c", // 4038.46
		];
		const balances = [
			ethers.utils.parseEther("326086.957"), // 0x22eD6B152469c0dE62c73483eA7175CCFC9F7dee
			ethers.utils.parseEther("434782.609"), // 0xaCC383C1f6DE96441cdeEbb761D7c6F8123E700f
			ethers.utils.parseEther("434782.609"), // 0xeD82c8F1b85D37f0d509fC7d5C78ECC52229fe21
			ethers.utils.parseEther("543478.261"), // 0x487a2E1ce5C2be9eDbeeE7CA4277ED9ccB25da25
			ethers.utils.parseEther("543478.261"), // 0x79Fc5080A87cD0204d413f8ABF058411Be11118F
			ethers.utils.parseEther("543478.261"), // 0x78068A28b5aAa09301Be5a03De81552F1D1F4a31
			ethers.utils.parseEther("1086956.522"), // 0xC2Dc950C78951f3Bda6aBDbf5234BeC1978e6cCB
			ethers.utils.parseEther("1086956.52"), // 0x4a2cfa628cbb67c2b956f88391b3bf25a56df38c
			ethers.utils.parseEther("543478.26"), // 0xd74057888ed229b1fbf485c6099b4f19b3f2f59b
			ethers.utils.parseEther("493842.66"), // 0x7d1b68ae2665b99369e39e6bc722c127f24efeb7
			ethers.utils.parseEther("961538.46"), // 0xF4F1f0e3Bb56822D8316473261170b365496668E
			ethers.utils.parseEther("125418.06"), // 0xe036a04c9c16cAC5D5C951Fb0c73fa932175C5D4
			ethers.utils.parseEther("108695.65"), // 0x0Ed67dAaacf97acF041cc65f04A632a8811347fF
			ethers.utils.parseEther("1086956.52"), // 0x5EFCd3D4c97Be7372cde546202423BaCbB5163dc
			ethers.utils.parseEther("192307.69"), // 0x5182531E3EbEB35AF19E00fa5DE03A12d46eBa72
			ethers.utils.parseEther("1923076.92"), // 0xe6735CD72B819c2Cc3CdB710a123f8FE32E596AD
			ethers.utils.parseEther("19230.77"), // 0xA08432f1a67CaeFD4BB79B8BD608b003590FBAC9
			ethers.utils.parseEther("96153.85"), // 0xb759E1E0cFaAf70Ba9f5538F834BA9f449Cc7AdC
			ethers.utils.parseEther("961538.46"), // 0xc451A2024a6C2622194F949EC914bF7492Fea8f1
			ethers.utils.parseEther("346153.85"), // 0x60fF54a44835fcC96121Cb250E76bCA420489Fc0
			ethers.utils.parseEther("961538.46"), // 0xeC872737c7fB00eE0f3Cd52f36f96a43D6D4f61E
			ethers.utils.parseEther("14423.08"), // 0x450fc6d014afcde3297de9575a8216a915220834
			ethers.utils.parseEther("96153.85"), // 0x1E2Ca40CBD620A94acfaf0eBEFe077E479bD1a4f
			ethers.utils.parseEther("20000"), // 0x1257b6871BFca1DA593fF5586e73eB1731b494fc
			ethers.utils.parseEther("4038.46"), // 0xA947960739C6cb01Be33F10D3c34bE49baDe1B6c
		];

		await this.contract.assignPrivate(buyers, balances);
	})

});

