import { Cell, beginCell, contractAddress, toNano} from "ton-core";
import { hex } from "../build/main.compiled.json";
import { TonClient } from "ton";

async function onchainScript() {
	const codeCell = Cell.fromBoc(Buffer.from(hex,"hex"))[0];
	const dataCell = new Cell();

	const address = contractAddress(0,{
		code: codeCell,
		data: dataCell,
	});

	console.log("Address: ",address)

}

onchainScript();