const { Sequelize, DataTypes } = require('sequelize');
const {db} =  require('../config/db.config');

const erc721NFTOwners = db.define('ERC721NFTOwners',{
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrementIdentity: true,
        autoIncrement: true,
        allowNull: false,
    },
    NftContractAddress:{
        type: DataTypes.STRING(100),
        allowNull: false,
        
    },
    TokenId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Owner:{
        type: DataTypes.STRING(100),
        allowNull: false,
    }
});


module.exports = erc721NFTOwners;