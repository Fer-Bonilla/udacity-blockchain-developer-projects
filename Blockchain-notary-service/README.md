 # Blockchain Notary Service
 
Build a Private Blockchain Notary Service! This project implement a Star Registry service that allows users to claim ownership of their favorite star in the night sky.
 
 ## Getting Started
 
 These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
 
 ### Prerequisites
 
 Installing Node and NPM is pretty straightforward using the installer package available from the (Node.js® web site)[https://nodejs.org/en/].
 
 ### Configuring your project
 
 - Install crypto-js with --save flag to save dependency to our package.json file
 ```
 npm install crypto-js --save
 ```
 - Install level with --save flag
```
npm install level --save
```
- Install express resful framework
```
npm install express --save
```
- Install bitcoin-message library
```
npm i bitcoinjs-message
```

## Files 
#### classes files
 ```
 -block.js : Class with a constructor for block
 ```
 ```
 -transaction.js : Class with a constructor for transaction  
 ```
 ```
 -mempool.js : Class with a constructor for MemPool
 ```
 ```
 -dataLevel.js : Functions for leveldb persistence
 ```
 ```
 -blockminer.js : Class for block mining and PoW
 ```
 ```
 -blockchain.js : Class for blockchain basic functions
 ```
```
-validateblockchain.js : Class with the methods for blockchain validation
```
```
-index.js : Class with the Web API in express
```
```
-validate.js : Class with API functions for star Validation Calls
```
```
-star.js : Class with the star info content
```
 
 ## Using the web API with the blockchain

1.: Run the express server 
Execute node index.js
```
```
2.: Create genesis block
In other terminal session Execute curl -X "POST" "http://localhost:8000/block"
```
```
3.: Search for a block in the blockchain
In other terminal session execute curl -X "GET" "http://localhost:8000/block/0".
```
```
4.: Make a request validation. ENDPOINT: http://localhost:8000/requestValidation
Execute curl -X "POST" "http://localhost:8000/requestValidation" -H 'Content-Type: application/json' -d $'{"address": {use bitcoin address}"}'
```
```
5.: Message signature validation. ENDPOINT: http://localhost:8000/message-signature/validate
Execute curl -X "POST" "http://localhost:8000/message-signature/validate" -H 'Content-Type: application/json' -d $'{
  "address": "{use bitcoin address}",
  "signature": "{Use a signature obtained with electrum wallet}"
}'
```
```
6.: Star Registration. ENDPOINT: http://localhost:8000/block
Execute curl -X "POST" "http://localhost:8000/block" -H 'Content-Type: application/json' -d $'{
  "address": "{Use a signature obtained with electrum wallet}",
  "star": {
    "dec": "-20° 50' 24.9''",
    "ra": "22h 29m 37.0s",
    "story": "Nice star between Aquarius and Piscis"
  }
}'
```
```
7.: Get the block by heigth. ENDPOINT: http://localhost:8000/block/{heigth}
Execute curl -X "GET" "http://localhost:8000/block/{heigth}" 
```
```
8.: Get the block by address. ENDPOINT: http://localhost:8000/stars/address:{address}
Execute curl -X "GET" "http://localhost:8000/stars/address:{address}" 
```
```
9.: Get the block by hash. ENDPOINT: http://localhost:8000/stars/hash:{hash}
Execute curl -X "GET" "http://localhost:8000/stars/hash:{hash}" 
```
