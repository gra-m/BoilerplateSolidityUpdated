"use strict";
// require node dotenv as soon as possible:
require('dotenv').config();
//need truffle installed in contracts folder: npm install @truffle/hdwallet-provider
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {interface: aBI, bytecode} = require('./compile');
// truffle is specify account and live node to be used(accessed via Infura):
const provider = new HDWalletProvider(
    process.env.WALLET_PHRASE,
    process.env.INFURA_ACCESS_ADDRESS,
)
const web3 = new Web3(provider);
let accounts;
let result;
let deploydetail;
const INITIAL_MESSAGE = "Well hello there..!";
const UPDATED_MESSAGE = "The message was updated, with gas cost of of 3 mil-yon dolla!";

// made self invoking
(async function(){
    accounts = await web3.eth.getAccounts();
    console.log('Attempting ',  accounts[1], ' deployment')
    result = await new web3.eth.Contract(JSON.parse(aBI))
        .deploy({data:bytecode, arguments: [INITIAL_MESSAGE]})
        .send({from: accounts[1], gas: 1_000_000})
    deploydetail = result.options.address + "||" + result.options.gasPrice  + "||" + result.options.gas;
    console.log('Address||gasPrice||gas = ', deploydetail)

    // this prevents a hanging deployment:
    provider.engine.stop(); //HDWalletProvider has no such but when I commented this out it hung.
})();



