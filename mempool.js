/* ===== MemPool ==================================
|  Class with a constructor for MemPool      	   |
|  ===============================================*/

class MemPool{
      
    // constructor for the class MemPool
    constructor(){
        this.transactions = [];
    };

    // function add transaction to the pool
    addTransaction(txtData){
        this.transactions.push(txtData);
    };

    // get the last transaction in the pool and delete from de MemPool
    getTransaction(){
        if (this.transactions.length > 1){
            return (this.transactions.shift());
        }
        else{
            return false;
        }    

    };

}

module.exports = MemPool;
