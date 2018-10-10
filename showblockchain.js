const levelSandbox = require('./levelSandbox');

//------------------------------------------------------------
// Step3: Visualize the Blockchain content
//------------------------------------------------------------

levelSandbox.getBlockChainData()
  .then(chainData => {
    console.log('Testing get the data on the blockchain:' );
    if(chainData.length > 0){
    for(blockid = 0; blockid < chainData.length; blockid++){
        console.log('Block # ['+blockid+'] block hash: ['+JSON.parse(chainData[blockid]).hash+'] DATA => ['+chainData[blockid]+']');
      }
    }
  else {console.log('Blockchain is empty');} 
  }
  );