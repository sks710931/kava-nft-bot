const erc721NFTOwners = require("./erc-721-nnft-owners");
const erc721transfers = require("./erc-721-nft-transfer");
const erc721Contract = require("./erc721-contract");
const erc721NFT = require("./erc-721");


const model = {
    ERC721NFTOwners: erc721NFTOwners,
    ERC721NFTTransfers: erc721transfers,
    ERC721Contract: erc721Contract,
    ERC721NFT: erc721NFT
}

module.exports = model;