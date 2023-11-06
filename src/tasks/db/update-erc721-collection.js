require('dotenv').config();
const {Contract} = require("@ethersproject/contracts");
const { JsonRpcProvider} = require("@ethersproject/providers");
const ercAbi = require("./../../abi/ERC721.json");
const {parseUnits, formatUnits} = require("@ethersproject/units");
const model = require('../../schema/model')
const updateERC721ContractInfo = async (event) => {
    try{
        console.log("Updating info for collection: ", event.address)
        const info = await model.ERC721Contract.findOne({where:{ContractAddress: event.address}});
        if(!info){
            const provider = new JsonRpcProvider(process.env.RPC_URL);
            const contract = new Contract(event.address, ercAbi, provider);

            const name = await contract.name();
            const symbol = await contract.symbol();


            await model.ERC721Contract.create({
                ContractAddress:event.address,
                CollectionName:name,
                CollectionSymbol:symbol,
                IsVerified: false,
            })
            console.log("Updated Contract:", name)
        }else{
            console.log("Contract available Already:", info.dataValues.CollectionName);
        }

    }catch(e){
        console.log("Error updating cotract info",e);
    }
}

module.exports = updateERC721ContractInfo;