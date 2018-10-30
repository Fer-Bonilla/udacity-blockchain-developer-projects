/* ===== Block validator  =============================
|  Class with a constructor for Block Miner     	   |
|  ===================================================*/
const testlevelSandbox = require('./levelSandbox')
const SHA256 = require('crypto-js/sha256');
const Block = require('./block')


class BlockValidator{

    //Class constructor
    constructor(){
        
    }
    // validate block
    validateBlock(block){
        // get block object
        let blockHash = block.hash;
        // remove block hash to test block integrity
        block.hash = '';
        // generate block hash
        let validBlockHash = SHA256(JSON.stringify(block)).toString();

        // Compare
        if (blockHash===validBlockHash) {
            return true;
          } else {
            return false;
          }
      }
  
     // Validate blockchain
      validateChain(){

        let errorLog = [];
        let blockcheck = new Block();
        testlevelSandbox.getBlockChainData().then(chainData => {
          if(chainData.length > 0){
            this.previoushash = "";
            for(this.blockid = 0; this.blockid < chainData.length; this.blockid++){
              //copy the block info
              this.tempblock = JSON.parse(chainData[this.blockid]);

              if (!this.validateBlock(this.tempblock)){
                errorLog.push('Block ['+this.tempblock.height+'] is corrupted');
              }
              if (this.tempblock.hash!=this.previousHash && this.tempblock > 0) {
                errorLog.push('Blockchain is corrupted');

              }
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
      });
    }

  }

module.exports = BlockValidator;