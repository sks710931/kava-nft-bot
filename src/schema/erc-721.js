const { Sequelize, DataTypes } = require('sequelize');
const {db} =  require('../config/db.config');
const { MAX } = require('mssql');


const erc721NFT = db.define('ERC721NFTs', {
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
    TokenId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Name:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    Description:{
        type: DataTypes.TEXT("long"),
        allowNull: true,
    },
    
    Attributes:{
        type: DataTypes.TEXT("long"),
        allowNull: true,
    },
    Image:{
        type: DataTypes.TEXT("long"),
        allowNull: true,
    },
    TokenUri:{
        type: DataTypes.TEXT("long"),
        allowNull: true,
    }
});

module.exports = erc721NFT;