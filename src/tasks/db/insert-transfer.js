require("dotenv").config();
const mongoose = require("mongoose");
const {  NFTTransfer } = require("../../schema/contracts");
const {getAddress} = require("@ethersproject/address");
const {defaultAbiCoder} = require("@ethersproject/abi");
const insertTransfers = async (event) => {
    try{
        const fromAddress = defaultAbiCoder.decode(['address'], event.topics[1])
        const toAddress = defaultAbiCoder.decode(['address'], event.topics[2])
        const transfer = new NFTTransfer({
            timestamp: Date.now(),
            blockNumber: event.blockNumber,
            from: getAddress(fromAddress[0]),
            nftContractAddress: getAddress(event.address),
            to:getAddress(toAddress[0]),
            tokenId: parseInt(event.topics[3]),
        });
        await transfer.save();
        console.log("Transfer Inserted");
    }catch(e){
        console.log("Error writing data to the db.", e);
    }
}
module.exports = insertTransfers;