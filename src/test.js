require("dotenv").config();
const {db} = require('./config/db.config');
const erc721NFTOwners = require('./schema/erc-721-nnft-owners');
const test = async () => {
   await db.sync();
   console.log("All Database Synced");
    const data = await erc721NFTOwners.findAll({where:{Owner: "0xee69E72B0A1524329e6dD66D8c7e974D939e7690"}});
   for(let d of data){
    console.log(d.dataValues.NftContractAddress);
   }

}
test();