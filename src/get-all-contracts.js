require('dotenv').config();
const {default: axios} = require("axios");


const processCollections = async ()=>{
    do{
       let processBreak = false;
       let page=0;
        while(!processBreak){
            console.log('processing page: ', page)
            const apiurl = `https://api.octoplace.io//collections?page=${page}&limit=100&name=&visible=1`;
            const apiResult = await axios.get(apiurl);
            if(apiResult.data.length < 100){
                page=0;
                processBreak = true;
            }else{
                page+=1;
            }
        }
    }while(true);
}
processCollections();
