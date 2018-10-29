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
#### Test files
```
-showblockchain.js : invoque for check the blokchain content
```
```
-validateblockchain.js : Function for validate the blockchain consistency
```
```
-testBlockchain.js : Function for run blockminet function. Every time that you invoque this function the system create 1o transactions, create the block and add 5 transactions, and invoque the miner block functions for add blocks to he blockchain using PoW.
```
```
-testblockchainvalidation.js : Test for function validation, change the info in the last block and validate the blockchain consistency.
```

## Testing
Suggested list of commands for test the simplechain system

To test code:
1: Open a command prompt or shell terminal after install node.js.
2: Enter a node session, also known as REPL (Read-Evaluate-Print-Loop).
```
node
```
3: Copy and paste your code into your node session

```
```
4: Check the blockchain content
```
Execute node showblockchain.js 
```
5: Populate the blockchain
```
Execute node testBlockchain.js . Every time that you call this file, the system adds a block to the blockchain. The first time the system creates the genesis block. recommend execute almost 4 times (For create 4 blocks). Try to take almost 2 seconds between executions due avoid locks database in the database. In the case that databaselock error is showed, try another execution.
```
6: try again the blockchain content
```
Execute node showblockchain.js 
```
7: Validate blockchain. 
```
Execute node validateblockchain.js 
```
8: Test modifying the blockchain
```
Execute node testblockchainvalidation.js 
```

## Using the web API with the blockchain
1: Populate the blockchain
```
Execute node testBlockchain.js . Every time that you call this file, the system adds a block to the blockchain. The first time the system creates the genesis block. recommend execute almost 4 times (To create 4 blocks). Try to take almost 2 seconds between executions due avoid locks database. In the case that database-lock error, try another execution.
```
```
2.: Run the express server 
Execute node index.js
```
```
3.: Search for a block in the blockchain
In other terminal session execute curl -X "GET" "http://localhost:8000/block/0" with the block index at the end.
```
```
4.: Add new block with the POST call
Execute curl -X "POST" "http://localhost:8000/block" -H 'Content-Type: application/json' -d $'{"transactions":[{"amount":0,"fromAdress":"AA0","toAdress":"BB0"},{"amount":1,"fromAdress":"AA1","toAdress":"BB1"},{"amount":2,"fromAdress":"AA2","toAdress":"BB2"}]}'
You can change the content of the transactions or add more transactions following thw json format.
```
```
5.: View the new block content
With the blockheigh returned in with the previous command (height) use in the next command considering the value returned
curl -X "GET" "http://localhost:8000/block/{block height}"
```
