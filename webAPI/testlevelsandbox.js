const SHA256 = require('crypto-js/sha256');
const Blockchain = require('./blockchain')
const Block = require('./block')
const levelSandbox = require('./levelSandbox')
const Transaction = require('./transaction');

testBlockchain = new Blockchain();
testBlock = new Block();

levelSandbox.getChainHeightData()
   .then(height => console.log('Testing getChainHeightData - Blockchain height: '+height));

//Create test transactions and ad to block
for (i=0; i < 5; i++)
   {
     tx0x = new Transaction(i, "AA"+i, "BB"+i);
     testBlock.addTransaction(tx0x);
     console.log('Transaction #'+i+ ' - Content: ' + JSON.stringify(tx0x));
   }
   
//Fill the block data

levelSandbox.getChainHeightData()
   .then(height => {
       
        testBlock.height = height; 

        levelSandbox.getLevelDBData(testBlock.height).then(value => {
            testBlock.previousBlockHash = value.hash;
            testBlock.timestamp = new Date().getTime().toString().slice(0,-3);
            testBlock.hash = SHA256(JSON.stringify(testBlock)).toString();

            levelSandbox.addLevelDBData(testBlock.height+1 ,  JSON.stringify(testBlock))
            .then(result => console.log('Test addLevelDBData function: '+ result))
            .catch(error => console.log(error));
        });
    });