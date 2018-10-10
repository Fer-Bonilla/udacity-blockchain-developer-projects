/* ===== Transaction Class =====================
|  Class with a constructor for transaction     |
|  ===========================================*/

/* ===== SHA256 with Crypto-js ===============================
|  Learn more: Crypto-js: https://github.com/brix/crypto-js  |
|  =========================================================*/

const SHA256 = require('crypto-js/sha256');

class Transaction{
    
    // constructor for the class transaction    
    constructor(amount, fromAdress, toAdress){
        this.amount = amount;
        this.fromAdress = fromAdress;
        this.toAdress = toAdress;
        this.time = new Date().getTime().toString().slice(0, -3);
        this.txHash = SHA256(JSON.stringify(this)).toString();
    }
}

module.exports = Transaction;