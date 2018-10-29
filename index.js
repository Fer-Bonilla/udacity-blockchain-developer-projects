/**
 * Criteria: Configure private blockchain project to include a RESTful API with Node.js framework running on port 8000.
 */
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const levelSandbox = require('./levelSandbox')
const Transaction = require('./transaction');
const memoryPool = require('./mempool');
const BlockMiner = require('./blockminer')

const webBlockMiner = new BlockMiner();


app.listen(8000, () => console.log('API listening on port 8000'))
app.use(bodyParser.json())



// Criteria: GET Block Endpoint. 
// Use height parameter -> http://localhost:8000/block/{height}
app.get('/block/:height', async (request, response) => {
  try {
    levelSandbox.getLevelDBData(request.params.height).then(value => {
        response.send(JSON.parse(value));
    }).catch(error => {
        response.status(404).json({
            "status": 404,
            "message": "Bad index, block don't exist"
          })
    });
  } catch (error) {
    response.status(404).json({
      "status": 404,
      "message": "Bad index, block don't exist"
    })
  }
})

// Criteria: POST Block endpoint 
// using json transactions array in the post call -> http://localhost:8000/block
app.post('/block', async (request, response) => {
  if (request.body.transactions === '' || request.body.transactions === undefined) {
    response.status(400).json({
      "status": 400,
      message: "Not Json transactions data"
    })
  }

var transactions = request.body.transactions; 
var memPool = new memoryPool();

//console.log("transactions => "+transactions.length)
//console.log("memPool => "+memPool.length)

for (tx = 0; tx < transactions.length; tx++){
    txn = new Transaction(transactions[tx].amount, transactions[tx].fromAdress, transactions[tx].toAdress);
    //console.log(txn)
    memPool.addTransaction(txn);
    //console.log("memPool Inside, Tx => "+memPool.transactions.length +" - "+tx)
} 
 
webBlockMiner.mineBlock(memPool).then(heightValue => {
    response.status(201).send('Block added to the blockchain block height => '+heightValue);        
    });
})