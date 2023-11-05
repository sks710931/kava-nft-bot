require("dotenv").config();
const sql = require("mssql");
const { sqlConfig } = require("../../config/db.config");
const { getAddress } = require("@ethersproject/address");
const { defaultAbiCoder } = require("@ethersproject/abi");

const updateOwners = async (event) => {
  try {
    console.log("Updating ERC721 token Owner");
    const pool = await sql.connect(sqlConfig);
    const ps = pool.request();
    ps.input("address", sql.NVarChar(1000), event.address);
    ps.input("tokenId", sql.Int, parseInt(event.topics[3]));

    const res = await ps.query(
      "select Owner, NftContractAddress, TokenId from ERC721NFTOwners where NftContractAddress=@address AND TokenId=@tokenId"
    );
    console.log(res.recordset);
    const request = pool.request();
    request.input("address", sql.NVarChar(1000), event.address);
    request.input("tokenId", sql.Int, parseInt(event.topics[3]));
    request.input(
      "owner",
      sql.NVarChar(1000),
      getAddress(defaultAbiCoder.decode(["address"], event.topics[2])[0])
    );
    if (res.recordset.length === 0) {
      await request.query(`insert into ERC721NFTOwners (NftContractAddress, TokenId, Owner) Values 
        (@address, @tokenId, @owner)`);
        console.log("New Owner Updated");
    } else {
      await request.query(`
      update ERC721NFTOwners set Owner=@owner where NftContractAddress=@address and TokenId=@tokenId
      `);
      console.log("Existing Owner Updated");
    }
    
  } catch (e) {
    console.log("Error updating owner", e);
  }
};
module.exports = updateOwners;
