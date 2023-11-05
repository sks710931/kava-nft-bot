require("dotenv").config();
const model = require('../../schema/model')
const {defaultAbiCoder} = require("@ethersproject/abi");
const {getAddress} = require("@ethersproject/address");
const insertTransfers = async (event) => {
    try{
        const fromAddress = defaultAbiCoder.decode(['address'], event.topics[1])
        const toAddress = defaultAbiCoder.decode(['address'], event.topics[2])
        await model.ERC721NFTTransfers.create({
            SentTo:getAddress(toAddress[0]),
            SentFrom:getAddress(fromAddress[0]),
            BlockNumber:event.blockNumber,
            TokenId:parseInt(event.topics[3]),
            NFTContractAddress: event.address,
            TxHash: event.transactionHash
        });
        console.log("Transfer Inserted");
    }catch(e){
        console.log("Error writing data to the db.", e);
    }
}
module.exports = insertTransfers;