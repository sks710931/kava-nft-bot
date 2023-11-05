require('dotenv').config();
const Web3 = require("web3");

const insertTransfers = require("./tasks/db/insert-transfer");
const updateOwners = require("./tasks/db/update-owner");
const updateErc721contracts = require("./tasks/db/update-erc721-collection");
const updateERC721NFT = require("./tasks/db/update-nft");


const web3= new Web3(process.env.KAVA_DATA_RPC);

async function getLogs(){
    let startBlock = 1;
    const offset = 5000;
    let endBlock = 0;
let latest = 0;
    do{
         latest = await web3.eth.getBlockNumber();
         startBlock = latest - 30000;
         console.log(latest)
         endBlock = startBlock;
        if(latest < endBlock+offset){
            endBlock = latest
          }else {
            endBlock +=offset;
          }
        const filter = {
            fromBlock: startBlock,
            toBlock: endBlock,
            topics: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', null, null, null]
          };
          console.log(`blocks ${startBlock} to ${endBlock}`);
          const logs = await web3.eth.getPastLogs(filter);
          for(let log of logs){
            console.log("Insert Log",log.id);
            await insertTransfers(log);
            console.log("Update Owner",log.id);
            await updateOwners(log);
            await updateErc721contracts(log);

          }
          startBlock=endBlock+1;
          console.log("Total Transfers:", logs.length)
    }while(latest > endBlock)
    

}
getLogs();