require("dotenv").config();
const mongoose = require("mongoose");
const { connectDB, disconnectDB } = require("./config/db.config");
const { NetworkContracts } = require("./schema/contracts");
const { JsonRpcProvider, BaseContract } = require("ethers");
const { Interface } = require("@ethersproject/abi");
const fs = require("fs");
const erc165Abi = require("./abi/ERC165.json");
const ERC1155InterfaceId = "0xd9b67a26";
const ERC721InterfaceId = "0x80ac58cd";
async function main() {
  try {
    await connectDB();
    for(let k = 0; k< 100000000; k++){
    const files = fs.readdirSync("src/data");
    let counter = 0;
    for (file of files) {
      const data = JSON.parse(fs.readFileSync(`src/data/${file}`));
      
      for (item of data) {
        counter += 1;
        try {
          console.log(`Round ${k} processing ${counter}`);
          const prov = new JsonRpcProvider(process.env.KAVA_RPC);
          const instance = new BaseContract(
            item.Address,
            new Interface(erc165Abi.abi),
            prov
          );
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
                await networkContract.save();
                console.log("inserted ", item.Address);
              } catch (e) {
                console.log("Skipped", item.Address, e.message);
                fs.appendFileSync("src/logs/logs.txt", "\n\n");
                fs.appendFileSync("src/logs/logs.txt", `Item ${counter} \n`);
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
                  await networkContract.save();
                  console.log("inserted ", item.Address);
                } catch (e) {
                  console.log("Skipped", item.Address, e.message);
                  fs.appendFileSync("src/logs/logs.txt", "\n\n");
                  fs.appendFileSync("src/logs/logs.txt", `Item ${counter} \n`);
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
          } catch (e) {
            fs.appendFileSync("src/logs/logs.txt", "\n\n");
            fs.appendFileSync("src/logs/logs.txt", `Item ${counter} \n`);
            if (e.code == 11000) {
              fs.appendFileSync(
                "src/logs/logs.txt",
                `ERROR CODE: DUPLICATE RECORD`
              );
            } else {
              fs.appendFileSync("src/logs/logs.txt", `ERROR CODE: ${e.code}`);
            }
          }
        } catch (e) {
          console.log(e.message);
          console.log("Contract Insertion skipped:", item.Address);
        }
      }
    }
    }
  } catch {}
}

main().catch((err) => console.log(err));
