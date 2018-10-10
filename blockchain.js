/* ===== SHA256 with Crypto-js ===============================
|  Learn more: Crypto-js: https://github.com/brix/crypto-js  |
|  =========================================================*/

const SHA256 = require('crypto-js/sha256');

const Block = require('./block')
const levelSandbox = require('./levelSandbox')

/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

class Blockchain{

  constructor(){
    this.db = levelSandbox;
    }

  // Add new block
  async addBlock(newBlock){
    try {
      if(newBlock.height >= 0){
        this.db.addLevelDBData(newBlock.height, JSON.stringify(newBlock)).then(() => { });
      }
    } catch(err) {
      console.log(err)
    }    
  }

  // Get block height
  getBlockHeight(){

    try {

      levelSandbox.getChainHeightData()
      .then(height => {
        console.log('Testing getChainHeightData - Blockchain height: '+height)
        return height;
      });

    } catch(err) {
      console.log(err)
    }    
  }

  // get block
  getBlock(blockHeight){
      // return object as a single string

      try {
        this.db.getLevelDBData(blockHeight).then((value) => {
          return JSON.parse(value)
        });
      } catch(err) {
        console.log(err)
      }        
      
    }

}

module.exports = Blockchain;