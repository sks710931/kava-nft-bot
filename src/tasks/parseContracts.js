require("dotenv").config();
const { JsonRpcProvider } = require("@ethersproject/providers");

async function parseContracts() {
  const provider = new JsonRpcProvider(process.env.KAVA_RPC);
  //const provider = new JsonRpcProvider("https://evm.data.kava.chainstacklabs.com");

  provider.on("block", getBlock);
  // const tx = await provider.getTransactionReceipt("0x7e25b9af952e6ff96f6559da75ddb1974e59a670e093b7d9b51dbc6619c71b24");
  // console.log(tx, tx.logs);
}

const getBlock = async (block) => {
  try {
    console.log("Parsing block ", block);
    const provider = new JsonRpcProvider(process.env.KAVA_RPC);
    blockData = await provider.getBlockWithTransactions(block);
    for (tx of blockData.transactions) {
      if (tx) {
        if (tx.to === null || tx.to === undefined) {
          console.log("Contract Deployment detected", tx.hash);
          const txDetails = await provider.getTransactionReceipt(tx.hash);
          console.log("Deployed Contract Address: ", txDetails.contractAddress);
          console.log("Contract Deployer", txDetails.from);
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
};


parseContracts();
