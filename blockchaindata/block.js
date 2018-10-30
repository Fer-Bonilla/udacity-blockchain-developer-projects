/* ===== Block Class ==============================
|  Class with a constructor for block 			   |
|  ===============================================*/

// parameter for the max transactions allowed in the block
const TXLIMIT = 5 

class Block{

    // constructor for the class Block
    constructor(){
     this.hash = "",
     this.height = 0,
     this.transactions = [],
     this.timestamp = 0,
     this.previousBlockHash = "",
     this.nonce = 0
    }

    // function for add transaction to the block
    addTransaction(txtData){

        if (this.transactions.length < TXLIMIT){
            this.transactions.push(txtData);
            return true;
        }

        else {
            console.log('Block is full. max '+TXLIMIT+' transactions per block allowed');
            return false;
        }


    }

    getAvailableSlots()
    {
        return (TXLIMIT - this.transactions.length) 
    }
}

module.exports = Block;