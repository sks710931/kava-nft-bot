require("dotenv").config();
const {db} = require("./config/db.config");
const insertTransfers = require("./tasks/db/insert-transfer");
const updateOwners = require("./tasks/db/update-owner");
const updateErc721contracts = require("./tasks/db/update-erc721-collection");
const updateERC721NFT = require("./tasks/db/update-nft");
const mongoose = require("mongoose");

const Web3 = require("web3");

async function startTrace() {
    await db.sync();
  var options = {
    reconnect: {
      auto: true,
      delay: 5000, // ms
      maxAttempts: 1,
      onTimeout: false,
    },
  };
  const web3 = new Web3(
    new Web3.providers.WebsocketProvider(process.env.WS_URL),
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
      console.log("Inserting transfer event for log id:" ,result.id)
      await insertTransfers(result);
      await updateOwners(result);
      await updateErc721contracts(result);
      await updateERC721NFT(parseInt(result.topics[3]), result.address);
      //Check and update contract info
    }
  }
};

startTrace();
