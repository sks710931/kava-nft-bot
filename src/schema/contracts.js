const mongoose = require("mongoose");

// Define the schema
const pageTrackerSchema = new mongoose.Schema({
  processedPageNumber: {
    type: Number,
    require: true,
    index: false,
  },
  nextPageNumber:{
    type: Number,
    require: true,
    index: false,
  }
});

const networkContractsSchema = new mongoose.Schema({
    address: {
        type: String,
        require:true,
        index: true,
        unique: true,
    },
    IsProcessed:{
        type: Boolean
    },
    NFTContractType:{
        type:String,
        index: true
    },
    deployer:{
        type: String,
        index: true,
    },
    deploymentTx:{
        type: String,
        index: true,
    }
})

// Create the model
const PageTracker = mongoose.model("PageTracker", pageTrackerSchema);
const NetworkContracts = mongoose.model("NetworkContracts", networkContractsSchema);
module.exports = {PageTracker, NetworkContracts};