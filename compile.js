const solc = require('solc')
const path = require('path');
const fs = require('fs');


// here __dirname resolves to BoilerplateSolidity
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');


// Update: Add the expected JSON formatted input:
const input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};


// output wildcarded above by the looks of it, accessors have changed, check below:
//console.log(module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts);

module.exports = JSON.parse(solc.compile(JSON.stringify(input)))
    .contracts['Inbox.sol']
    .Inbox;

