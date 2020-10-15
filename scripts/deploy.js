const fs = require('fs');
const { ethers, config } = require("@nomiclabs/buidler");

async function deploy() {
	const w  = await new ethers.Wallet.fromEncryptedJson(fs.readFileSync(process.env.WALLET, 'utf8'), process.env.WALLET_PASSWORD);
	const ip = new ethers.providers.JsonRpcProvider(config.networks.homestead.url);
	const wallet = w.connect(ip);

	const saleFactory = await ethers.getContractFactory("Sale", wallet);
	console.log(`Deploying sale`);
	const sale = await saleFactory.deploy(
		"0xa58a4f5c4Bb043d2CC1E170613B74e767c94189B", // UTU Token
		"0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT
		"0xB7CFd9E1971e41B539311D8cb895CaDFF078884c", // KYC authority
		"0x4296448461C836c36d250C8F860d5ef67008EFfc", // treasury
		1602651600 // sale start, 2020-10-14 0500 UTC
	);
	await sale.deployed();
	console.log(`Sale deployed at: ${sale.address}`)
}

deploy().catch(err => { console.log(err); })
