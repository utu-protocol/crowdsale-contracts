const fs = require('fs');
const { ethers, config } = require("@nomiclabs/buidler");


async function deploy() {
	const j = fs.readFileSync('wallet.json', 'utf8');
	const w  = await new ethers.Wallet.fromEncryptedJson(j, process.argv[2]);
}

deploy().catch(err => { console.log(err); })
