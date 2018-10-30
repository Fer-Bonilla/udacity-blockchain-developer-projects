/* ===== Block validator  =============================
|  Class with a constructor for Block Miner     	   |
|  ===================================================*/

const Blockchain = require('./blockchain.js');

const BlockchainInstance = new Blockchain();

class BlockValidator{

    //Class constructor
    constructor(){
        
    }
    // validate block
    validateBlock(blockHeight){
        // get block object
        let block = BlockchainInstance.getBlock(blockHeight);
        // get block hash
        let blockHash = block.hash;
        // remove block hash to test block integrity
        block.hash = '';
        // generate block hash
        let validBlockHash = SHA256(JSON.stringify(block)).toString();
        // Compare
        if (blockHash===validBlockHash) {
            return true;
          } else {
            console.log('Block #'+blockHeight+' invalid hash:\n'+blockHash+'<>'+validBlockHash);
            return false;
          }
      }
  
     // Validate blockchain
      validateChain(){
        let errorLog = [];
        for (var i = 0; i < BlockchainInstance.getBlockHeight()-1; i++) {
          // validate block
          if (!BlockchainInstance.validateBlock(i))errorLog.push(i);
          // compare blocks hash link
          let blockHash = BlockchainInstance.getBlock(i).hash;
          let previousHash = BlockchainInstance.getBlock(i+1).previousBlockHash;
          if (blockHash!==previousHash) {
            errorLog.push(i);
          }
        }
        if (errorLog.length>0) {
          console.log('Block errors = ' + errorLog.length);
          console.log('Blocks: '+errorLog);
          return false;
        } else {
          console.log('No errors detected, Blockchain is valid');
          return true;
        }
      }

    }

module.exports = BlockValidator;