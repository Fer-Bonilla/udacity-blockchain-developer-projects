# Project overview

## Descentralized Star Notary Project

Create a Dapp in Ethereum and deploy in the Rinkeby test Network.

## Project requierementes

Part1 - Write a Smart Contract to support a notarization service

part2 - Test Smartcontract coverage

Part3 - Deploy Smartcontract in the Rinkeby public network

Part4 - Modify the web3 client to interact with the smartcontract

# Getting Started
 
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes, and process to deploy in the Rinkeby public test network.

## Prerequisites
 
 Installing Node and NPM is pretty straightforward using the installer package available from https://nodejs.org/en/.
 
## Configuring your project Locallly

### Clone the Github repository in your computer

### Install de components ins the smart_contracts folder

 - Install ganache:npm install -g ganache-cli
 - Install web3: npm install web3
 - Install the Wallet provider: npm install truffle-hdwallet-provider
 - Install Lite-server: npm install lite-server --save-dev
 - Install Metamask in the web browser

## Compiling and using the smartcontract

### Run the Ganache-cli client
$ Ganache-cli

### Compile the SmartContract

Truffle compile

### Test the SmartContract

Truffle test

![test-result](https://user-images.githubusercontent.com/33405407/48361723-1b16ba00-e670-11e8-9efc-cfd710acc36b.png)


### Migrate the smartcontract in the local Ganache Test Network

Truffle migrate

### Test the client
- Run the web server with: $ npm run dev
- Access your web browser with the link localhos:3000
- Register your new star



# Use the contract in the Rinkeby public test network

## Contract deploymnet

To deploy the contract in the Rinkeby public test network was used the command: 

$ truffle migrate --network rinkeby --reset --compile-all


## Infura service

https://rinkeby.infura.io/v3/57ea1782cc6f4728bdd122fda6a31052

## contract address
0xec2764593ebb15a6664030326cb75b1d5bc0f810

https://rinkeby.etherscan.io/address/0xec2764593ebb15a6664030326cb75b1d5bc0f810

## star tokenId
1

## Star registration 
