const fs = require('fs');
const { ethers, config } = require("@nomiclabs/buidler");

async function deploy() {
	const w  = await new ethers.Wallet.fromEncryptedJson(fs.readFileSync(process.env.WALLET, 'utf8'), process.env.WALLET_PASSWORD);
	const ip = new ethers.providers.JsonRpcProvider(config.networks.homestead.url);
	const wallet = w.connect(ip);

	const distFactory = await ethers.getContractFactory("Distributor", wallet);
	console.log(`Deploying first distributor`);
	const dist = await distFactory.deploy(
		"0xa58a4f5c4Bb043d2CC1E170613B74e767c94189B", // UTU Token
		ethers.utils.parseEther("27600000.00"), // First distribution is 27.6M coins
		1604120400 // 10/31/2020 5:00:00 UTC
	);
	await dist.deployed();
	console.log(`Distributor deployed at: ${dist.address}`)
}

deploy().catch(err => { console.log(err); })

