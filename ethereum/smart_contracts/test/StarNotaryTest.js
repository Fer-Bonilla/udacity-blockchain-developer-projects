///@Project Criteria
///contains tests for the following functions and all tests are approved without error.
///createStar()
///putStarUpForSale()
///buyStar()
///checkIfStarExist()
///mint()
///approve()
///safeTransferFrom()
///SetApprovalForAll()
///getApproved()
///isApprovedForAll()
///ownerOf()
///starsForSale()
///tokenIdToStarInfo()

const StarNotary = artifacts.require('StarNotary')

contract('StarNotary', accounts => {

  let starId = 1
  let starPrice = web3.toWei(0.1,'ether')

  beforeEach(async function() { 
    this.contract = await StarNotary.new({from: accounts[0]})
  })

  ///createStar() - tokenIdToStarInfo()
  describe('can create a star - createStar() - tokenIdToStarInfo()', () => { 
      it('can create a star and get its Info', async function () { 
          await this.contract.createStar('Star power 103!', 'I love my wonderful star', 'ra_032.155', 'dec_121.874', 'mag_245.978', { from: accounts[0] })
          assert.deepEqual(await this.contract.tokenIdToStarInfo(1), ['Star power 103!', 'I love my wonderful star', 'ra_032.155', 'dec_121.874', 'mag_245.978'])
      })
  })

  ///putStarUpForSale() - starsForSale()
  describe('User can sell their Star - putStarUpForSale() - starsForSale()', () => { 
    it('user can put their star for sale', async function() {
      await this.contract.createStar('Star power 103!', 'I love my wonderful star', 'ra_032.155', 'dec_121.874', 'mag_245.978', { from: accounts[0] })
      assert.equal(await this.contract.ownerOf(starId), accounts[0])
      await this.contract.putStarUpForSale(starId, starPrice, { from: accounts[0] })
      assert.equal(await this.contract.starsForSale(starId), starPrice)
    })
  })

  ///buyStar()
  describe('Users can buy a Star - buyStar()', () => { 
    it('user buy a Star', async function() {
      await this.contract.createStar('Star power 103!', 'I love my wonderful star', 'ra_032.155', 'dec_121.874', 'mag_245.978', { from: accounts[0] })
      await this.contract.putStarUpForSale(starId, starPrice, { from: accounts[0] })
      await this.contract.buyStar(starId, { from: accounts[2], value: starPrice, gasPrice: 0 })
      assert.equal(await this.contract.ownerOf(starId), accounts[2])
    })
  })

  ///checkIfStarExist()
  describe('can verify Star registration - checkIfStarExist()', () => { 
    it('star is registered', async function () { 
      await this.contract.createStar('Star power 103!', 'I love my wonderful star', 'ra_032.155', 'dec_121.874', 'mag_245.978', { from: accounts[0] })
      assert.equal(await this.contract.checkIfStarExist('ra_032.155', 'dec_121.874', 'mag_245.978'), true)
      })
  })

  ///mint()
  describe('Can verify mint function - mint()', () => { 
    it('StarToken belong to the right owner', async function() {
      await this.contract.mint(starId, { from: accounts[0] })
      let starOwner = await this.contract.ownerOf(1, { from: accounts[0] })
      assert.equal(starOwner, accounts[0])
    })
  })

  ///approve() - getApproved()
  describe('Balance transfer verification and transaction aprroval - approve() - getApproved()', () => { 
    it('approve address', async function() {
      await this.contract.createStar('Star power 103!', 'I love my wonderful star', 'ra_032.155', 'dec_121.874', 'mag_245.978', { from: accounts[0] })
      await this.contract.approve(accounts[1], starId, { from: accounts[0] })
      assert.equal(await this.contract.getApproved(starId, { from: accounts[0] }), accounts[1])
    })
  })

  ///safeTransferFrom()
  describe('Verify safe transfer - safeTransferFrom()', () => { 
    it('user is the star owner', async function() {
      await this.contract.createStar('Star power 103!', 'I love my wonderful star', 'ra_032.155', 'dec_121.874', 'mag_245.978', { from: accounts[0] })
      await this.contract.safeTransferFrom(accounts[0], accounts[1], starId)
      assert.equal(await this.contract.ownerOf(starId, { from: accounts[0] }), accounts[1])
    })
  })


  ///SetApprovalForAll() - isApprovedForAll()
  describe('Verifiy address approvals - SetApprovalForAll() - isApprovedForAll()', () => { 
    it('approve all address', async function() {
      await this.contract.createStar('Star power 103!', 'I love my wonderful star', 'ra_032.155', 'dec_121.874', 'mag_245.978', { from: accounts[0] })
      await this.contract.setApprovalForAll(accounts[1], starId)
      assert.equal(await this.contract.isApprovedForAll(accounts[0], accounts[1], { from: accounts[0] }), true)
    })
  })

  ///ownerOf()
  describe('Right Star Ownership after creation - ownerOf()', () => { 
    it('star has correct owner after created', async function() {
      await this.contract.createStar('Star power 103!', 'I love my wonderful star', 'ra_032.155', 'dec_121.874', 'mag_245.978', { from: accounts[0] })
      const starOwner = await this.contract.ownerOf(1, { from: accounts[0] })
      assert.equal(starOwner, accounts[0])
    })
  })

})