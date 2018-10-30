const Transaction = require('./transaction');
const memoryPool = require('./mempool');
const BlockMiner = require('./blockminer')

//------------------------------------------------------------
//Step1: Create 10 transactions and add to mempool
//------------------------------------------------------------

const testPool = new memoryPool();
const testBlockMiner = new BlockMiner();

console.log('Creating test transactions..... ');

for (i=0; i < 10; i++)
{
  tx0x = new Transaction(i, "AA"+i, "BB"+i);
  testPool.addTransaction(tx0x);
  console.log('Transaction #'+i+ ' - Content: ' + JSON.stringify(tx0x));
}

//console.log(JSON.stringify(testPool))

console.log('memPool transactions count: '+testPool.transactions.length);

//------------------------------------------------------------
//Step2: Running the Miner s block
//
//In the case that blockchain is empty the miner, create the genesys block
//Is blockchain is not empty miner take transaction from the mempoool, validate the blockchain and add the block to the blockchain
//------------------------------------------------------------

var blockHeight = testBlockMiner.mineBlock(testPool);
