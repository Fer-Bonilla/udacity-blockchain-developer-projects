 # Blockchain Data
 
 Blockchain has the potential to change the way that the world approaches data. Develop Blockchain skills by understanding the data model behind Blockchain by developing your own simplified private blockchain.
 
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
 - levelsandbox.js : Functions for leveldb persistence
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
4.: Add new block with the POST call
Execute curl -X "POST" "http://localhost:8000/block" -H 'Content-Type: application/json' -d $'{"body": "Testing block with test string data"}'
```
```
5.: View the new block content
With the blockheigh returned in with the previous command (height) use in the next command considering the value returned
curl -X "GET" "http://localhost:8000/block/1"
```
