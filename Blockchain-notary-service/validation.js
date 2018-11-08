const dbr = require('level')('./stardata')
const bitcoinMessage = require('bitcoinjs-message')
const addressClass = require('./addressClass')


class validation {
  constructor () {
    
  }

  async verifyRequest(address) {
    try{
      return new Promise((resolve, reject) => {
        dbr.get(address, (error, value) => {
            if(value === undefined) {
              console.log("Address don't found")
              return resolve(value)
            }else{
              value = JSON.parse(value)
              resolve(value)
            }  
          })
        });
      }
      catch(error){
          return reject(error)
        }      
    }

    async registerRequestValidation(address4Register){
      try{
        return new Promise((resolve, reject) => {
          if(address4Register.address !== '' || address4Register.address !== undefined){
            const reqAddress = new addressClass(address4Register)
            dbr.put(reqAddress.address, JSON.stringify(reqAddress))
            return resolve(reqAddress)
          }
          else{
            return reject("No address in the request!")
          }
        })
      }
      catch(error){
        return reject(error)
      }
    }

    
    async updateRequestValidation(reqAddress){
      try{
        return new Promise((resolve, reject) => {
          const expirationTime = reqAddress.requestTime + (5 * 60 *1000)
          if(Date.now()  > expirationTime){
            return resolve(this.registerRequestValidation(reqAddress.address))
          }else{
            reqAddress.validationWindow = Math.floor((expirationTime - Date.now())/ 1000)
            return resolve(reqAddress)
          }
        })
      }
      catch(error){
        return reject(error)
      }
    }    


    async verifySignature(address, signature) {
      try{
        return new Promise((resolve, reject) => {
          dbr.get(address, (error, value) => {
            if (value === undefined) {
              return reject(new Error("Address don't found"))
            } else if (error) {
              return reject(error)
            }
    
            value = JSON.parse(value)
    
            if (value.messageSignature === 'valid') {
              return resolve({
                registerStar: true,
                status: value
            }) 
            } else {
                const expirationTime = value.requestTime + (5 * 60 *1000)
                var requestValid = false

                if(Date.now()  > expirationTime){
                  value.validationWindow = 0
                  value.messageSignature = 'Validation window was expired'                  
                  return resolve(value)
                }else{
                  value.validationWindow = Math.floor((expirationTime - Date.now())/ 1000)
                  try {
                    requestValid = bitcoinMessage.verify(value.message, address, signature)
                  } catch (error) {
                    requestValid = false
                  }
                  value.messageSignature = requestValid ? 'valid' : 'invalid'

                }
                dbr.put(address, JSON.stringify(value))
      
                return resolve({
                    registerStar: !(Date.now()  > expirationTime) && requestValid,
                    status: value
                }) 
            }
          })
        })
      }catch(error){  
    }
  }

  //Delete the request data for a star registered in tje blockchain
  deleteRequest(address) {
    try{
      dbr.del(address)
    }catch(error){
      throw new Error("Fail to delete request")
    }
  }

  validateAutorization(address) {
    try{
      return new Promise((resolve, reject) => {
        return dbr.get(address, (error, value) => {
          if (value === undefined) {
            return reject(new Error("Address is not registered. Transaction refused!"))
          } else if (error) {
            return reject(error)
          }
          value = JSON.parse(value)
          return resolve(value.messageSignature === 'valid')
        })
      })
    }catch(error){
     
    } 
  }

  validateStarcontent(starContent) {
    let verification = true
    
    if (starContent !== '' || starContent !== undefined){
      
      if (starContent.address === '' || starContent.address === undefined) {
        verification = false
        throw new Error('Need to specify an address')
      }
      
      if (starContent.star === '' || starContent.star === undefined) {
        verification = false
        throw new Error('Need to fill star info, is empty')
      }

      if (starContent.star.dec === undefined || starContent.star.ra === undefined || starContent.star.dec  === '' || starContent.star.ra === '') {
        verification = false
        throw new Error("Need to specify values for dec and ra")
      }
  
      if (starContent.star.story === '' || starContent.star.story === undefined) {
        verification = false
        throw new Error("Need to specify value for story")
      }

      if (new Buffer(starContent.star.story).length > 500) {
        verification = false
        throw new Error('Story maximun long is 500 bytes')
      }

    }else{
      verification = false
      throw new Error("Request have not info, verify!")

    }
  return verification
  }

}

module.exports = validation