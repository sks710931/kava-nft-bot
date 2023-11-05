const erc721NFTOwners = require("./erc-721-nnft-owners");
const erc721transfers = require("./erc-721-nft-transfer");



const model = {
    ERC721NFTOwners: erc721NFTOwners,
    ERC721NFTTransfers: erc721transfers
}

module.exports = model;