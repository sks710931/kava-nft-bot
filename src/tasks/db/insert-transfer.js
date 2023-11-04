require("dotenv").config();
const sql = require("mssql");
const {sqlConfig} = require("../../config/db.config");
const {getAddress} = require("@ethersproject/address");
const {defaultAbiCoder} = require("@ethersproject/abi");
const insertTransfers = async (event) => {
    try{
        const pool = await sql.connect(sqlConfig);
        const request = pool.request();
        
        const fromAddress = defaultAbiCoder.decode(['address'], event.topics[1])
        const toAddress = defaultAbiCoder.decode(['address'], event.topics[2])
        
        request.input('SentTo',sql.NVarChar(1000), getAddress(toAddress[0]));
        request.input('SentFrom',sql.NVarChar(1000), getAddress(fromAddress[0]));
        request.input('BlockNumber', sql.BigInt, event.blockNumber);
        request.input('TokenId', sql.Int, parseInt(event.topics[3]));
        request.input('NFTContractAddress', sql.NVarChar(1000), event.address);
        request.input('TxHash', sql.NVarChar(1000), event.transactionHash);

        await request.query(`INSERT INTO ERC721NFTTransfers
         (SentTo, SentFrom, BlockNumber, TokenId,NFTContractAddress, TxHash) VALUES 
         (@SentTo , @SentFrom, @BlockNumber, @TokenId, @NFTContractAddress, @TxHash)`)
        
        console.log("Transfer Inserted");
    }catch(e){
        console.log("Error writing data to the db.", e);
    }
}
module.exports = insertTransfers;