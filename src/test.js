const {defaultAbiCoder} = require("@ethersproject/abi");

console.log(defaultAbiCoder.decode(['address'], "0x0000000000000000000000006ddefc745c9d689c340595367fbb7eeea93c654a"))