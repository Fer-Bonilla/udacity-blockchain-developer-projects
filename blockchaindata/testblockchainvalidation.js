const SHA256 = require('crypto-js/sha256');
const Block = require('./block')
const testlevelSandbox = require('./levelSandbox')
const BlockValidator = require('./blockchainvalidator');

testBlock = new Block();
testBlockValidator = new BlockValidator();

// alterate blockchain info
// Get the last block and change the previousBlockHash value

testlevelSandbox.getChainHeightData()
   .then(height => {

    testlevelSandbox.getLevelDBData(height).then(value => {
            //add fake previousBlockHash
            this.testBlock = JSON.parse(value);           
            this.testBlock.previousBlockHash = SHA256('hash error').toString();
            this.testBlock.timestamp = new Date().getTime().toString().slice(0,-3);

            testlevelSandbox.addLevelDBData(this.testBlock.height ,  JSON.stringify(this.testBlock))
            .then(result => {console.log('Adding corrupted block'+ result)
          
              if(testBlockValidator.validateChain())
                console.log('Blockhain is valid');
              else console.log('Blockchain is corrupted');            
              }
            )
            .catch(error => console.log(error));
          
          });
    });
