const Web3 = require("web3");

const web3= new Web3(process.env.KAVA_DATA_RPC);

async function getLogs(){
    const latest = await web3.eth.getBlockNumber();

    const filter = {
        fromBlock: latestBlock - 100,
        toBlock: 'latest',
        topics: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef']
      };
      const logs = await web3.eth.getPastLogs(filter);
      console.log(logs);

}