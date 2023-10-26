const mongoose = require("mongoose");
const fs = require("fs");

const ERC1155InterfaceId = "0xd9b67a26";
const ERC721InterfaceId = "0x80ac58cd";

async function upgradeContracts(){
    console.log("Start updating contracts.");
    const files = fs.readdirSync('src/data');
    console.log(files, files.length);
    return true;
}
module.exports = upgradeContracts;