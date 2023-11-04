require("dotenv").config();
const {connectDB, disconnectDB} = require("./config/db.config");
const insertTransfers = require("./tasks/db/insert-transfer");
const mongoose = require("mongoose");

const Web3 = require("web3");

async function startTrace() {
    await connectDB();
  var options = {
    reconnect: {
      auto: true,
      delay: 5000, // ms
      maxAttempts: 1,
      onTimeout: false,
    },
  };
  const web3 = new Web3(
    new Web3.providers.WebsocketProvider(process.env.KAVA_WS),
    options
  );

  web3.eth.subscribe(
    "logs",
    {
      topics: [web3.utils.keccak256("Transfer(address,address,uint256)")],
    },
    parseEvents
  );
}

const parseEvents = async (error, result) => {
  const erc721TransferSign = Web3.utils.keccak256(
    "Transfer(address,address,uint256)"
  );
  if (error) {
    console.log("Error Occured", error);
  } else {
    console.log("Event received");

    if (result.topics[0] === erc721TransferSign && result.topics[3]) {
      console.log("NFT Send Detected");
      console.log("Contract Address: ", result.address);
      console.log("From:", result.topics[1]);
      console.log("To:", result.topics[2]);
      console.log("TokenId:", result.topics[3]);
      console.log("Inserting transfer event for log id:" ,result.id)
      await insertTransfers(result);
    }
  }
};

startTrace();
