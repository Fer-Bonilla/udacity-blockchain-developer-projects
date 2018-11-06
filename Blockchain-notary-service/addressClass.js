class addressClass{

 constructor(address){
    this.address = address
    this.requestTime = Date.now()
    this.message = `${address}:${this.requestTime }:starRegistry`
    this.validationWindow = 300
 }
}

module.exports = addressClass

