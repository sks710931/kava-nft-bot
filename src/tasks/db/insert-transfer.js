require("dotenv").config();
const mongoose = require("mongoose");
const {  NFTTransfer } = require("../../schema/contracts");
const {getAddress} = require("@ethersproject/address");

const insertTransfers = async (event) => {
    try{
        const transfer = new NFTTransfer({
            timestamp: Date.now(),
            blockNumber: event.blockNumber,
            from: getAddress(event.topics[1]),
            nftContractAddress: getAddress(event.address),
            to:getAddress(event.topics[2]),
            tokenId: parseInt(event.topics[3]),
        });
        await transfer.save();
        console.log("Transfer Inserted");
    }catch(e){
        console.log("Error writing data to the db.", event.id);
    }
}
module.exports = insertTransfers;