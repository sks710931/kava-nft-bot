require("dotenv").config();
const { Contract } = require("@ethersproject/contracts");
const { JsonRpcProvider } = require("@ethersproject/providers");
const ercAbi = require("./../../abi/ERC721.json");
const model = require("../../schema/model");
const { default: axios } = require("axios");

const base64regex =
  /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
const updateERC721NFT = async (tokenId, address) => {
  console.log("Update NFT Initiated");
  try {
    const nftObj = await model.ERC721NFT.findOne({
      where: {
        ContractAddress: address,
        TokenId: tokenId,
      },
    });
    if (!nftObj) {
      const provider = new JsonRpcProvider(process.env.KAVA_RPC);
      const contract = new Contract(address, ercAbi, provider);
      let name = "";
      let description = "";
      let attributes = [];
      let image = "";
      let tokenUri = await contract.tokenURI(tokenId);
      let metadata = {};
      var isBase64 = base64regex.test(tokenUri.split(",")[1]);
      if (isBase64) {
        console.log("Base64 detected");
        metadata = atob(tokenUri.split(",")[1]);
        metadata = JSON.parse(metadata);
        if (metadata) {
          name = metadata.name;
          description = metadata.description;
          attributes = metadata.attributes;
          image = metadata.image;
          await model.ERC721NFT.create({
            ContractAddress: address,
            TokenId: tokenId,
            Name: name,
            Description: description,
            Attributes: JSON.stringify(attributes),
            Image: image,
            TokenUri: tokenUri,
          });
          console.log(`Base 64 inser successful for ${name}`);
        }
      } else if (tokenUri.includes("ipfs://")) {
        tokenUri.replace("ipfs://", "https://ipfs.io/ipfs/");
        // query using ipfs gateway
        const result = await axios.get(tokenUri);
        metadata = result.data;
        if (metadata) {
          name = metadata.name;
          description = metadata.description;
          attributes = metadata.attributes;
          image = metadata.image;
          await model.ERC721NFT.create({
            ContractAddress: address,
            TokenId: tokenId,
            Name: name,
            Description: description,
            Attributes: JSON.stringify(attributes),
            Image: image,
            TokenUri: tokenUri,
          });
        }
        console.log(`${name} inserted successfully`);
      } else if (
        tokenUri.includes("https://") ||
        tokenUri.includes("http://")
      ) {
        //use actual uri
        const result = await axios.get(tokenUri);
        metadata = result.data;
        if (metadata) {
          name = metadata.name;
          description = metadata.description;
          attributes = metadata.attributes;
          image = metadata.image;
          await model.ERC721NFT.create({
            ContractAddress: address,
            TokenId: tokenId,
            Name: name,
            Description: description,
            Attributes: JSON.stringify(attributes),
            Image: image,
            TokenUri: tokenUri,
          });
        }
        console.log(`${name} inserted successfully`);
      }else{
        await model.ERC721NFT.create({
            ContractAddress: address,
            TokenId: tokenId,
          });

          console.log("Blank NFT Inserted!")
      }
    } else {
      console.log(`${nftObj.dataValues.Name} already exists!`);
    }
  } catch (e) {
    console.log("Error occured while updating the NFT", e.message);
  }
};
module.exports = updateERC721NFT;
