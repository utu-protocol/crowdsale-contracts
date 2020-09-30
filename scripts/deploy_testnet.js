const fs = require('fs');
const { ethers, config } = require("@nomiclabs/buidler");


// This expects a wallet.json with the default Ethereum keystore format and the
// unlock password in the WALLET_PASSWORT environment var.

async function deploy() {
	const j = fs.readFileSync('wallet.json', 'utf8');
	const w  = await new ethers.Wallet.fromEncryptedJson(j, process.env.WALLET_PASSWORD);
	const ip = new ethers.providers.JsonRpcProvider(config.networks.goerli.url);
	const wallet = w.connect(ip);

	const tetherFactory = await ethers.getContractFactory("TetherMock", wallet);
	console.log(`Deploying USDT`);
	const tether = await tetherFactory.deploy(ethers.BigNumber.from("1000000000"));
	await tether.deployed();
	console.log(`USDT deployed at: ${tether.address}`);

	const saleFactory = await ethers.getContractFactory("Sale", wallet);
	console.log(`Deploying sale`);
	const sale = await saleFactory.deploy(
		ethers.constants.AddressZero, // UTU Token
		tether.address, // USDT
		await wallet.address, // KYC authority
		await wallet.address, // treasury
		Math.floor(Date.now() / 1000) - 100 // sale start
	);
	await sale.deployed();
	console.log(`Sale deployed at: ${sale.address}`)

}

deploy().catch(err => { console.log(err); })

