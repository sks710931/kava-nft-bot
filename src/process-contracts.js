require("dotenv").config();
const fs= require("fs");
const updateCollection = require("./tasks/db/update-erc721-collection");

async function process(){
    let contracts = fs.readFileSync("src/data/contracts.json");
    contracts = JSON.parse(contracts);
    for(let contract of contracts){
        await updateCollection({address:contract.contractAddress})
    }

}
process();