import { Cell, beginCell, contractAddress, toNano} from "ton-core";
import { hex } from "../build/main.compiled.json";
import { TonClient } from "ton";
import qs from "qs";
import qrcode from "qrcode-terminal";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";


const API_URL = "https://testnet.toncenter.com/api/v2"

	// axios http client // yarn add axios
async function getData(url: string): Promise<any> {
	try {
	  const config: AxiosRequestConfig = {
		url: url,
		method: "get",
	  };
	  const response: AxiosResponse = await axios(config);
	  //console.log(response)
	  return response.data.result;
	} catch (error) {
	  console.error(error);
	  throw error;
	}
  }

async function getTransactions(address: String) {
  var transactions;
  try {
	transactions = await getData(
	  `${API_URL}/getTransactions?address=${address}&limit=1`
	);
  } catch (e) {
	console.error(e);
  }
  return transactions;
}

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
		//bin: beginCell().storeUint(1,32).endCell().toBoc({idx: false}).toString("base64"),
	});

	console.log("Transaction link:",transactionLink);


	qrcode.generate(transactionLink, {small: true }, (qr) => {
		console.log(qr);
	});

	setInterval(async () => {
		const txes = await getTransactions(address.toString());
		if(txes[0].in_msg.source === "EQCj2gVRdFS0qOZnUFXdMliONgSANYXfQUDMsjd8fbTW-RuC") {

		}

	},10000)


}

onchainScript();