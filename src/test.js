require("dotenv").config();
const {db} = require('./config/db.config');
const {Contract} = require("@ethersproject/contracts");
const { JsonRpcProvider} = require("@ethersproject/providers");
const ercAbi = require("./abi/ERC721.json");
const updateERC721NFT = require("./tasks/db/update-nft");


const test = async () => {
        await db.sync();
       await updateERC721NFT(1,"0xA366C1E80642Abcaa190Ed4Fd7C9bA642228053b");
        //await updateERC721NFT(2553,"0x35361C9c2a324F5FB8f3aed2d7bA91CE1410893A");

}
test();