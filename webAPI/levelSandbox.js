/* ===== Persist data with LevelDB ===================================
|  Learn more: level: https://github.com/Level/level     |
|  =============================================================*/

const level = require('level');
const chainDB = './chaindata';
const db = level(chainDB);

// Add data to levelDB with key/value pair
function addLevelDBData(key,value){
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
function getLevelDBData(key){
  return new Promise((resolve, reject) => {
    db.get(key, (error, value) => {
      if (error) {
        reject(error)
      }

      resolve(value)
    })
  })
}

function getChainHeightData(){
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

// Add data to levelDB with value
function addDataToLevelDB(value) {
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

function getBlockChainData() {
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


module.exports = {
  addLevelDBData,
  getChainHeightData,
  addDataToLevelDB,
  getLevelDBData,
  getBlockChainData
};