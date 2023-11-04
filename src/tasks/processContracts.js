require("dotenv").config();
const mongoose = require("mongoose");
const { connectDB, disconnectDB } = require("../config/db.config");
const { NetworkContracts } = require("../schema/contracts");
const { JsonRpcProvider, BaseContract } = require("ethers");
const { Interface } = require("@ethersproject/abi");
const fs = require("fs");
const erc165Abi = require("../abi/ERC165.json");
const ERC1155InterfaceId = "0xd9b67a26";
const ERC721InterfaceId = "0x80ac58cd";

const processContracts = async () => {
    const rpc = process.env.KAVA_RPC;
    const provider = new JsonRpcProvider(rpc);
    do{
        const files = fs.readdirSync("src/data");
        const fileToProcess = files[0];
         
        //read file data 
        const fileData = JSON.parse(fs.readFileSync(`src/data/${fileToProcess}`));
        for(let item of fileData){
            
            const contract = new BaseContract(item.Address, new Interface(erc165Abi.abi), provider);
            const networkContract = new NetworkContracts({
                ABI: item.ABI,
                Address: item.Address,
                CompilerVersion: item.CompilerVersion,
                ContractName: item.ContractName,
                IsNFTContract: false,
                IsProcessed: false,
                NFTContractType: "unknown",
                OptimizationUsed: item.OptimizationUsed,
              });
              try {
                const res = await instance.supportsInterface(ERC721InterfaceId);
                console.log(res);
            if (res) {
                  console.log(counter, " ERC721 Found: ", item.Address);
                  networkContract.IsNFTContract = true;
                  networkContract.IsProcessed = true;
                  networkContract.NFTContractType = "ERC721";
                  try {
                    //await networkContract.save();
                    console.log("inserted ", item.Address);
                  } catch (e) {
                    console.log("Skipped", item.Address, e.message);
                    fs.appendFileSync("src/logs/logs.txt", "\n\n");
                    fs.appendFileSync("src/logs/logs.txt", `Item \n`);
                    if (e.code == 11000) {
                      fs.appendFileSync(
                        "src/logs/logs.txt",
                        `ERROR CODE: DUPLICATE RECORD`
                      );
                    } else {
                      fs.appendFileSync(
                        "src/logs/logs.txt",
                        `ERROR CODE: ${e.code}`
                      );
                    }
                  }
                } else {
                  const res2 = await instance.supportsInterface(ERC1155InterfaceId);
                  console.log(res);
                  if (res2) {
                    console.log(counter, " ERC1155 Found: ", item.Address);
                    networkContract.IsNFTContract = true;
                    networkContract.IsProcessed = true;
                    networkContract.NFTContractType = "ERC1155";
                    try {
                     // await networkContract.save();
                      console.log("inserted ", item.Address);
                    } catch (e) {
                      console.log("Skipped", item.Address, e.message);
                      fs.appendFileSync("src/logs/logs.txt", "\n\n");
                      fs.appendFileSync("src/logs/logs.txt", `Item \n`);
                      if (e.code == 11000) {
                        fs.appendFileSync(
                          "src/logs/logs.txt",
                          `ERROR CODE: DUPLICATE RECORD`
                        );
                      } else {
                        fs.appendFileSync(
                          "src/logs/logs.txt",
                          `ERROR CODE: ${e.code}`
                        );
                      }
                    }
                  }
                }
              

        
    }while(true);
}
setTimeout(processContracts, 5000);

