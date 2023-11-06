require("dotenv").config();
const Web3 = require("web3");
const { db } = require("./config/db.config");
const insertTransfers = require("./tasks/db/insert-transfer");
const updateOwners = require("./tasks/db/update-owner");
const updateErc721contracts = require("./tasks/db/update-erc721-collection");
const updateERC721NFT = require("./tasks/db/update-nft");
const {Contract} = require("@ethersproject/contracts");
const {parseUnits, formatUnits} = require("@ethersproject/units");
const { JsonRpcProvider} = require("@ethersproject/providers");
const ercAbi = require("./abi/ERC165.json");
const abi721 = require("./abi/ERC721.json");

const ERC721InterfaceId = "0x80ac58cd";

const web3 = new Web3("http://172.190.238.225:18888/rpc");

async function getLogs() {
  await db.sync();
  const provider = new JsonRpcProvider("http://172.190.238.225:18888/rpc");
  do {
    latest = await web3.eth.getBlockNumber();
    console.log(latest);
    const filter = {
      fromBlock: latest - 100,
      toBlock: latest,
      topics: [
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        null,
        null,
        null,
      ],
    };
    console.log(`blocks ${latest - 100} to ${latest}`);
    const logs = await web3.eth.getPastLogs(filter);
    console.log(`${logs.length} logs received`);
    for (let log of logs) {
      
      let result = false;
      try{
        console.log("Building contract")
        const contract = new Contract(log.address, ercAbi.abi, provider);
        console.log(contract)
        result = await contract.supportsInterface(ERC721InterfaceId);
        console.log(`${log.address} ${result ? 'does' : "doesn't"} supports ERC721 Interface `);
      }catch(e){
        console.log(`${log.address} ${result ? 'does' : "doesn't"} supports ERC721 Interface `,e.message);
      }
      try{
        if(!result){
          const contract = new Contract(log.address, abi721, provider);
        const uri = await contract.tokenURI(ERC721InterfaceId);
        if(uri && uri.length > 0){
          result=true;
        }
        }
      }catch(e){
        console.log(`${log.address} ${result ? 'does' : "doesn't"} supports ERC721 Interface `, e.message);
      }
      
      if (log.topics.length === 4 && result) {

        console.log(formatUnits(log.topics[3],0))
        console.log("Insert Log", log);
        await insertTransfers(log);
        console.log("Update Owner", log.id);
        await updateOwners(log);
        await updateErc721contracts(log);
        await updateERC721NFT(formatUnits(log.topics[3],0), log.address);
      }
    }
    console.log("Total Transfers:", logs.length);
  } while (true);
}
getLogs();
