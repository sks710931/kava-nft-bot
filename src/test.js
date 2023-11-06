require("dotenv").config();
const {db} = require('./config/db.config');
const {Contract} = require("@ethersproject/contracts");
const { JsonRpcProvider} = require("@ethersproject/providers");
const ercAbi = require("./abi/ERC721.json");
const updateERC721NFT = require("./tasks/db/update-nft");

const Web3 = require("web3");

const test = async () => {
        const web3= new Web3("http://172.190.238.225:18888/rpc");
        const provider = new JsonRpcProvider("http://172.190.238.225:18888/rpc");
        const block = await provider.getBlockNumber();
        const filter = {
                fromBlock: 22000000,
                toBlock: 22004000,
                topics: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', null, null, null]
              };
              
              const logs = await web3.eth.getPastLogs(filter);
              console.log(logs.length);

}
test();