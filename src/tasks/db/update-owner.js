require("dotenv").config();
const mongoose = require("mongoose");
const { ERC721NFTOwner } = require("../../schema/contracts");
const { getAddress } = require("@ethersproject/address");
const { defaultAbiCoder } = require("@ethersproject/abi");

const updateOwners = async (event) => {
  try {
    console.log("Updating ERC721 token Owner");
    const toAddress = getAddress(
      defaultAbiCoder.decode(["address"], event.topics[2])[0]
    );

    const owner = await ERC721NFTOwner.findOne({
      nftContractAddress: event.address,
      tokenId: parseInt(event.topics[3]),
    }).exec();
    if (owner && owner.owner) {
      owner.nftContractAddress = event.address;
      (owner.tokenId = parseInt(event.topics[3])), (owner.owner = toAddress);
      await owner.save();
      console.log("Owner Updated");
    } else {
      const newOwner = new ERC721NFTOwner({
        nftContractAddress: event.address,
        tokenId: parseInt(event.topics[3]),
        owner: toAddress,
      });
      await newOwner.save();
    }
  } catch (e) {
    console.log("Error updating owner", e);
  }
};
module.exports = updateOwners;
