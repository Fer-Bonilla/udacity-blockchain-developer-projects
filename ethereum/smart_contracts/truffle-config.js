/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */
var HDWalletProvider = require('truffle-hdwallet-provider');

//const mnemonic = 'flip affair sentence host suggest old clutch crucial jungle cube deal symbol';

const mnemonic = 'forward gather transfer upper tongue file eagle benefit control excite advance estate';
const infura = 'https://rinkeby.infura.io/v3/57ea1782cc6f4728bdd122fda6a31052'

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
    networks: { 
      development: {
        host: '127.0.0.1',
        port: 8545,
        network_id: "*"
      }, 
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic,infura),
      network_id: 4,
    }
  },
};
