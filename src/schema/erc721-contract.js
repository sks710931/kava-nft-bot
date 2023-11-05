const { Sequelize, DataTypes } = require('sequelize');
const {db} =  require('../config/db.config');


const erc721Contracts = db.define('ERC721Contracts', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrementIdentity: true,
        autoIncrement: true,
        allowNull: false,
    },
    ContractAddress:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    CollectionName:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    CollectionSymbol:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    CollectionDescription:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    DeployedBlockNumber: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    DeployerAddress:{
        type: DataTypes.STRING,
        allowNull: true,
        
    },
    DeploymentTxHash:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    IsVerified:{
        type: DataTypes.BOOLEAN,
        allowNull: false, 
        defaultValue: false
    },
    VerifierAddress:{
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = erc721Contracts;