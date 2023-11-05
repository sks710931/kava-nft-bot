require("dotenv").config();
const {db} = require('./config/db.config');
const {Contract} = require("@ethersproject/contracts");
const { JsonRpcProvider} = require("@ethersproject/providers");
const ercAbi = require("./abi/ERC721.json");
const updateERC721NFT = require("./tasks/db/update-nft");


const test = async () => {
        await db.sync();
       await updateERC721NFT(24171814,"0x04866796aabB6B58e6bC4d91A2aE99105b2C58AE");
        //await updateERC721NFT(2553,"0x35361C9c2a324F5FB8f3aed2d7bA91CE1410893A");

}
test();