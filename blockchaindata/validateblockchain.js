const BlockValidator = require('./blockchainvalidator');

testBlockValidator = new BlockValidator();

//validate the blockchain consistency
testBlockValidator.validateChain();
