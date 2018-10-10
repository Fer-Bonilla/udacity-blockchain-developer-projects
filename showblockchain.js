const levelSandbox = require('./levelSandbox');

//------------------------------------------------------------
// Step3: Visualize the Blockchain content
//------------------------------------------------------------

levelSandbox.getBlockChainData()
  .then(chainData => {
    console.log('Testing get the data on the blockchain:' );
    for(blockid = 0; blockid < chainData.length; blockid++){
        console.log('Block # '+blockid+' => '+chainData[blockid]);
      }
    }
    );

levelSandbox.getChainHeightData()
   .then(height => console.log('Testing getChainHeightData - Blockchain height: '+height));