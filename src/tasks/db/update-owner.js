require("dotenv").config();
const model = require("../../schema/model");
const { getAddress } = require("@ethersproject/address");
const { defaultAbiCoder } = require("@ethersproject/abi");

const updateOwners = async (event) => {
  try {
    console.log("Updating ERC721 token Owner");
    const owner = await model.ERC721NFTOwners.findOne({
      where: {
        NftContractAddress: event.address,
        TokenId: parseInt(event.topics[3]),
      },
    });
    console.log(owner.dataValues);
    if (owner && owner.dataValues && owner.dataValues.Owner) {
      await model.ERC721NFTOwners.update(
        {
          Owner: getAddress(
            defaultAbiCoder.decode(["address"], event.topics[2])[0]
          ),
        },
        {
          where: {
            NftContractAddress: event.address,
            TokenId: parseInt(event.topics[3]),
          },
        }
      );
      console.log("Existing Owner Inserted");
    } else {
      
      console.log("Existing Owner Updated");
    }
  } catch (e) {
    console.log("Error updating owner", e);
  }
};
module.exports = updateOwners;
