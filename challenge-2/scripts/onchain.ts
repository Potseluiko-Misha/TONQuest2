import { Cell, beginCell, contractAddress, toNano} from "ton-core";
import { hex } from "../build/main.compiled.json";
import { TonClient } from "ton";
import qs from "qs";
import qrcode from "qrcode-terminal";

async function onchainScript() {
	const codeCell = Cell.fromBoc(Buffer.from(hex,"hex"))[0];
	const dataCell = new Cell();

	const address = contractAddress(0,{
		code: codeCell,
		data: dataCell,
	});

	console.log("Address: ",address)

	let transactionLink =
	'https://app.tonkeeper.com/transfer/' +
	address.toString({
		testOnly: true,
	}) +
	"?" +
	qs.stringify({
		text: "Sent simple in",
		amount: toNano("0.6").toString(10),
	});

	console.log("Transaction link:",transactionLink);


	qrcode.generate(transactionLink, {small: true }, (qr) => {
		console.log(qr);
	});

}

onchainScript();