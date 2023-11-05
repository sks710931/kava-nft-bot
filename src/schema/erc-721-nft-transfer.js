const { Sequelize, DataTypes } = require('sequelize');
const {db} =  require('../config/db.config');


const erc721NftTransfers = db.define('ERC721NFTTransfers', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrementIdentity: true,
        autoIncrement: true,
        allowNull: false,
    },
    CreatedAt:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now()
    },
    SentTo:{
        type: DataTypes.STRING(100),
        allowNull: false,
        
    },
    SentFrom:{
        type: DataTypes.STRING(100),
        allowNull: false,
        
    },
    BlockNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    TokenId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    NFTContractAddress:{
        type: DataTypes.STRING(100),
        allowNull: false,
        
    },
    TxHash:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
});

module.exports = erc721NftTransfers;