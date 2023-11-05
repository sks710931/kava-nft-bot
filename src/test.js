require("dotenv").config();
const {db} = require('./config/db.config');
const {Contract} = require("@ethersproject/contracts");
const { JsonRpcProvider} = require("@ethersproject/providers");
const ercAbi = require("./abi/ERC721.json");
const updateERC721NFT = require("./tasks/db/update-nft");


const test = async () => {
        await db.sync();
       await updateERC721NFT(8017383,"0x9e66EBa102B77Fc75cD87b5e60141b85573BC8e8");
        //await updateERC721NFT(2553,"0x35361C9c2a324F5FB8f3aed2d7bA91CE1410893A");

}
test();