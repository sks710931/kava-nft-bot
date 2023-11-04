const mongoose = require("mongoose");

// Define the schema
const pageTrackerSchema = new mongoose.Schema({
  processedPageNumber: {
    type: Number,
    require: true,
    index: false,
  },
  nextPageNumber: {
    type: Number,
    require: true,
    index: false,
  },
});

const networkContractsSchema = new mongoose.Schema({
  address: {
    type: String,
    require: true,
    index: true,
    unique: true,
  },
  IsProcessed: {
    type: Boolean,
  },
  NFTContractType: {
    type: String,
    index: true,
  },
  deployer: {
    type: String,
    index: true,
  },
  deploymentTx: {
    type: String,
    index: true,
  },
});
const nftOwners = new mongoose.Schema({
  nftContractAddress: {
    type: String,
    require: true,
    index: true,
  },
  tokenId: {
    type: Number,
    require: true,
    index: true,
  },
  owner: {
    type: String,
    require: true,
    index: true,
  },
});

const nftTransfers = new mongoose.Schema({
  nftContractAddress: {
    type: String,
    require: true,
    index: true,
  },
  tokenId: {
    type: Number,
    require: true,
    index: true,
  },
  blockNumber: {
    type: Number,
    require: true,
    index: true,
  },
  from: {
    type: String,
    require: true,
    index: true,
  },
  to: {
    type: String,
    require: true,
    index: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
// Create the model
const PageTracker = mongoose.model("page-tracker", pageTrackerSchema);
const NetworkContract = mongoose.model(
  "contracts",
  networkContractsSchema
);
const NFTOwner = mongoose.model("nft-owners", nftOwners);
const NFTTransfer = mongoose.model("nft-transfers", nftTransfers);
module.exports = { PageTracker, NetworkContract, NFTOwner, NFTTransfer };
