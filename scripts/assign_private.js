const fs = require('fs');
const { ethers, config } = require("@nomiclabs/buidler");

const privAddrs = [
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

const privBals = [
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

async function deploy() {
	const w  = await new ethers.Wallet.fromEncryptedJson(fs.readFileSync(process.env.WALLET, 'utf8'), process.env.WALLET_PASSWORD);
	const ip = new ethers.providers.JsonRpcProvider(config.networks.homestead.url);
	const wallet = w.connect(ip);

	let sum = ethers.BigNumber.from(0);
	for (let i in privAddrs) {
		sum = sum.add(privBals[i]);
	}
	console.log(`${privAddrs.length} private contributors for total: ${ethers.utils.formatEther(sum)}`);

	const sale = await ethers.getContractAt("Sale", "0x6dd25ce9a4e09d16c6ab2a2e9caa373aaeb0fdfd", wallet);
	const est = await sale.estimateGas.assignPrivate(privAddrs, privBals)
	console.log((est).toString());
	const atx = await sale.assignPrivate(privAddrs, privBals, { gasLimit: est });
	await atx.wait();
}

deploy().catch(err => { console.log(err); })

