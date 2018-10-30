/* ===== Blockminer Class ==============================
|  Class with a constructor for Block Miner     	   |
|  ===================================================*/

const SHA256 = require('crypto-js/sha256');

const BlockValidator = require('./blockchainvalidator')
const BlockChain = require('./blockchain')
const Block = require('./block')
const levelSandbox = require('./levelSandbox')

const BlockchainValidator = new BlockValidator();
const BlockchainInstance = new BlockChain();

const DIFICULTY = 1 


class BlockMiner{

    constructor(){
        this.block = new Block();
    }

    mineBlock(memorypool,bodycontent){

        return new Promise((resolve, reject) => {

            levelSandbox.getChainHeightData()
            .then(height => {
    
                if (height === -1){
     
                  console.log('Creating genesys block');
    
                    levelSandbox.getChainHeightData().then(height => {
                        if (height === -1) {
                          // -1 height indicates an empty chain
                          const genesysBlock = new Block();
                          genesysBlock.timestamp = new Date().getTime().toString().slice(0,-3);
                          genesysBlock.body = "First block in the chain - Genesis block";                          
                          genesysBlock.hash = SHA256(JSON.stringify(genesysBlock)).toString();
                          levelSandbox.addLevelDBData(genesysBlock.height, JSON.stringify(genesysBlock)).then(() => {
                            console.log('First block in the chain - Genesis block');
                            var heightValue= this.block.height;
                            resolve(heightValue);
                          });
                        } 
                        }
                      );
    
    
                } else {
    
                    // previous block hash
                    this.block = new Block();

                    levelSandbox.getLevelDBData(height).then(value => {
    
                        this.block.previousBlockHash = JSON.parse(value).hash;
    
                        this.block.height = parseInt(height) + 1;
                        
                        if (bodycontent != '' || bodycontent != undefined) 
                            this.block.body = bodycontent;

                        // UTC timestamp
                        this.block.timestamp = new Date().getTime().toString().slice(0,-3);
    
                        //Load transactions in the new block for mining
    
                        this.txTemp = new Block();
                        this.check = true;    
                        while((this.block.getAvailableSlots() > 0) && this.check){
                            if(this.txTemp = memorypool.getTransaction()){
                                this.check = this.block.addTransaction(this.txTemp)
                            }else{
                                this.check = false;   
                            }
                        }        
    
                        //Block Mining with PoW
                        console.log('Executing PoW ....')
                        while (this.block.hash.substring(0, DIFICULTY) !== Array(DIFICULTY + 1).join("0")) {
                            this.block.nonce++;
                            this.block.hash = "";
                            this.block.hash = SHA256(JSON.stringify(this.block)).toString();
                        }
                        console.log("BLOCK MINED: " + this.block.hash);
    
                        //Send the block to the blockchain
                        levelSandbox.addLevelDBData(this.block.height, JSON.stringify(this.block)).then(() => {
                            var heightValue= this.block.height;
                            resolve(heightValue);
                          });   
    
                    });

                }
              }) 

            
          })



    }

}

module.exports = BlockMiner;