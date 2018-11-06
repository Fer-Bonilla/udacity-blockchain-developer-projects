/* ===== Persist data with LevelDB ===================================
|  Learn more: level: https://github.com/Level/level     |
|  =============================================================*/

const level = require('level');
const chainDB = './chaindata';
const db = level(chainDB);

class dataLayer {

  constructor () {

  }

  // Add data to levelDB with key/value pair
  async addBlock(key,value){
    return new Promise((resolve, reject) => {
      db.put(key, value, (error) => {
        if (error) {
          reject(error)
        }
        console.log(`Added block #${key}`)
        resolve(value)
      })
    })
  }

  // Get data from levelDB with key
  async getBlockByHeigth(key){
    return new Promise((resolve, reject) => {
      db.get(key, (error, value) => {
        if (error) {
          reject(error)
        }
        if(value === '' || value === undefined){
          reject(error)
        } else {
          let block = JSON.parse(value)
          if (block.body !== '' && block.body !== undefined){
            if (block.body.star !== '' && block.body.star !== undefined){
              block.body.star.storyDecoded = new Buffer(block.body.star.story, 'hex').toString()
            }
          }
          resolve(JSON.stringify(block))
        }
      })
    })
  }

  // Get blocks by hash
  async getBlockByHash(hash){
    let block = '';
    return new Promise((resolve, reject) => {
      db.createReadStream().on('data', (data) => {    
        block = JSON.parse(data.value)

        if (block.hash === hash) {
            block.body.star.storyDecoded = new Buffer(block.body.star.story, 'hex').toString()
            resolve(block)
        }

        }).on('error', (error) => {
          reject(error)
        }).on('close', () => {
          resolve(block);
        });
    })
  }

  // Get blocks by address
  async getBlocksByAddress(address) {
    const blocks = []
    let block = ''

    return new Promise((resolve, reject) => {
      db.createReadStream().on('data', (data) => {
          block = JSON.parse(data.value)

          if (block.body.address === address) {
            block.body.star.storyDecoded = new Buffer(block.body.star.story, 'hex').toString()
            blocks.push(block)
          }
      }).on('error', (error) => {
        return reject(error)
      }).on('close', () => {
        return resolve(blocks)
      })
    })
  }

  // Get the blockchain height
  async getBlockchainHeight(){
    return new Promise((resolve, reject) => {
      let height = -1

      db.createReadStream().on('data', (data) => {
        height++
      }).on('error', (error) => {
        reject(error)
      }).on('close', () => {
        resolve(height)
      })
    })
  }

  // Add block to the top in the blockchain
  async addBlockOnTop(value) {
      let i = 0;
      db.createReadStream().on('data', function(data) {
            i++;
          }).on('error', function(err) {
              return console.log('Unable to read data stream!', err)
          }).on('close', function() {
            console.log('Block #' + i);
            addLevelDBData(i, value);
          });
  }

  // Get all the blocks in the blockchain
  async getAllBlocks(){
    const chainData = [];

    return new Promise((resolve, reject) => {
      db.createValueStream()
        .on('data', (block) => {
          chainData.push(block);
        })
        .on('error', (error) => {
          reject(error);
        })
        .on('close', () => {
          resolve(chainData);
        });
    });
  }
}

module.exports = dataLayer;