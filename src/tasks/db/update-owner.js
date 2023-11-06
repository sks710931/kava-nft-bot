require("dotenv").config();
const model = require("../../schema/model");
const { getAddress } = require("@ethersproject/address");
const { defaultAbiCoder } = require("@ethersproject/abi");
const {parseUnits, formatUnits} = require("@ethersproject/units");
const updateOwners = async (event) => {
  try {
    console.log("Updating ERC721 token Owner");
    const owner = await model.ERC721NFTOwners.findOne({
      where: {
        NftContractAddress: event.address,
        TokenId: event.topics[3],
      },
    });
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
            TokenId:event.topics[3],
          },
        }
      );
      console.log("Existing Owner Inserted");
    } else {
      await model.ERC721NFTOwners.create({
        NftContractAddress: event.address,
        TokenId: event.topics[3],
        Owner: getAddress(
          defaultAbiCoder.decode(["address"], event.topics[2])[0]
        ),
      });
      console.log("New Owner Inserted");
    }
  } catch (e) {
    console.log("Error updating owner", e);
  }
};
module.exports = updateOwners;
