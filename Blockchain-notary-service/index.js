/**
 * Criteria: Configure private blockchain project to include a RESTful API with Node.js framework running on port 8000.
 */
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const dataLayer = require('./dataLayer')
const Transaction = require('./transaction');
const memoryPool = require('./mempool');
const BlockMiner = require('./blockminer')
const validation = require('./validation')
const star = require('./star')

const webBlockMiner = new BlockMiner();
const dataAccess = new dataLayer();

//app.use(compression())
app.listen(8000, () => console.log('API listening on port 8000'))
app.use(bodyParser.json())



// Criteria: GET Block Endpoint. 
// Use height parameter -> http://localhost:8000/block/{height}
app.get('/block/:height', async (request, response) => {
  try {
    dataAccess.getBlockByHeigth(request.params.height).then(value => {
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

//POST block registration
//This method is a improvement over the methos used in the thow excercises before. This method can add transactions block or block with body content 
//Using json transactions list or body information call -> http://localhost:8000/block'
app.post('/block', async (request, response) => {
  
    var transactions = request.body.transactions; 
    var bodycontent = request.body.body; 
    var addressContent = request.body.address; 
    var starContent = request.body.star; 

    var memPool = new memoryPool();
    let verified = false
    const starValidation = new validation()

    if ((transactions === '' || transactions === undefined) && (bodycontent === '' || bodycontent === undefined) && (addressContent === '' || addressContent === undefined)) {
       
        //check if the blockchain is empty
        dataAccess.getBlockchainHeight().then(height => {
            if (height === -1) {
                // Call the miner fro create the genesys block
                webBlockMiner.mineBlock(memPool).then(heightValue => {
                    response.status(201).send('Genesys Block added to the blockchain');        
                });
            } else {
                response.status(201).send('No transactions or body content in the message(2). Could not create blocks');        
            }
        });       
       
    } else{
        if (transactions !== '' && transactions !== undefined){
            for (tx = 0; tx < transactions.length; tx++){
                txn = new Transaction(transactions[tx].amount, transactions[tx].fromAdress, transactions[tx].toAdress);
                memPool.addTransaction(txn);
            } 
        }
            
        if (memPool.transactions.length > 0 || bodycontent !== '' || bodycontent !== undefined || addressContent !== '' || addressContent !== undefined || starContent !== '' || starContent !== undefined ) {
          
          if(addressContent !== '' || addressContent !== undefined  && starContent !== '' || starContent !== undefined)
            //trying to register a star
            if (addressContent !== '' && addressContent !== undefined){
              verified = await starValidation.validateAutorization(addressContent)
              if (!verified) {
                throw new Error('star registration not authorized')
              }else {
                bodycontent = new star(addressContent,starContent.ra, starContent.dec, starContent.story)
              }
            }
          
            //bodycontent = starContent
            webBlockMiner.mineBlock(memPool,bodycontent).then(heightValue => {
                response.status(201).send('Block added to the blockchain block height => '+heightValue);        
            });
        }
        else{
            response.status(201).send('No transactions or body in the message. Could not create blocks');  
        }
    }
})


  // POST requestValidation
  // Using json address info call -> http://localhost:8000/requestValidation
  app.post('/requestValidation', async (request, response) => {
    try{
        const starValidation = new validation()  
        //Validate if the address exists   
        dataAddress = await starValidation.verifyRequest(request.body.address)
        
        // Address Request validation is not registered and the save to the validation request register
        if(dataAddress === undefined){
          dataAddress = await starValidation.registerRequestValidation(request.body.address)
          response.json(dataAddress)
        }else{
          //Reauist Validation exists, update the windowtime value
          dataAddress = await starValidation.updateRequestValidation(dataAddress)
          response.json(dataAddress)
        }
    }
    catch(error){
        response.status(201).send('No request validation registered'); 
    }
  })
  
  
  // POST message-signature validation
  // Using json address and signature call -> http://localhost:8000/message-signature/validate'
  app.post('/message-signature/validate', async (request, response) => {
    const starValidation = new validation(request)
    try {
      const responseContent = await starValidation.verifySignature(request.body.address, request.body.signature)
  
      if (response.registerStar) {
        response.json(response)
      } else {
        response.status(401).json(responseContent)
      }
    } catch (error) {
      response.status(404).json({
        status: 404,
        message: error.message
      })
    }
  })
  
//Requirement 1: Search by Blockchain Wallet Address
//Use height parameter -> http://localhost:8000/stars/address:{address}
app.get('/stars/address:address', async (request, response) => {
    try {
      var address = request.params.address.slice(1)
      response.send(await dataAccess.getBlocksByAddress(address))

    } catch (error) {
        response.status(404).json({
            "status": 404,
            "message": "Don't found adress in the blockchain"
      })
    }
  })
  

//Requirement 2: Search by Star Block Hash
//Use height parameter -> http://localhost:8000/stars/hash:{hash}
app.get('/stars/hash:hash', async (request, response) => {
    try {
      var hash = request.params.hash.slice(1) 
      response.send(await dataAccess.getBlockByHash(hash))
    } catch (error) {
        response.status(404).json({
            "status": 404,
            "message": "Don't found hash in the blockchain"
      })
    }
  })

// Requirement 3: Search by Star Block Height. 
// Use height parameter -> http://localhost:8000/block/{height}
app.get('/block/:height', async (request, response) => {
    try {
        dataAccess.getBlockByHeigth(request.params.height).then(value => {
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