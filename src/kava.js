require("dotenv").config();
const {connectDB, disconnectDB} = require("./config/db.config");
const readContracts = require("./tasks/readContracts");
const updateContracts = require("./tasks/updateContracts");
const mongoose = require("mongoose");

async function main(){
    try{
        await connectDB();
        setInterval(readContracts, 30000);
        // const updateResult = updateContracts();
        // if(updateResult){
        //     setInterval(updateContracts, 5000);
        // }
    }catch{

    }
}

main().catch(err => console.log(err));

