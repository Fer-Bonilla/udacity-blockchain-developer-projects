class star{

    constructor(addressQ,raQ, decQ, storyQ){
        this.address = addressQ
        this.star = {
            ra : raQ,
            dec : decQ,
            story : new Buffer(storyQ).toString('hex')
        }
    }
}

module.exports = star;