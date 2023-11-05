require("dotenv").config();
const fs= require("fs");
const updateCollection = require("./tasks/db/update-erc721-collection");
const updateNFT = require("./tasks/db/update-nft");
const model = require("./schema/model");

async function process(){
    let contracts = fs.readFileSync("src/data/contracts.json");
    contracts = JSON.parse(contracts);
    for(let contract of contracts){
        const nfts = await model.ERC721NFTOwners.findAll({where:{NftContractAddress: contract.contractAddress}});
        for(let nft of nfts){
            await updateNFT(nft.dataValues.TokenId, nft.dataValues.NftContractAddress);
        }
    }

}
process();