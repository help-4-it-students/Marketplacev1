const Marketplace = artifacts.require('./Marketplace.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Marketplace', ([deployer, seller, buyer]) => {
  let marketplace

  before(async () => {
    marketplace = await Marketplace.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await marketplace.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, '')
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await marketplace.name()
      assert.equal(name, ' Marketplace')
    })
  })

  describe('products', async () => {
    let result, productCount

    before(async () => {
      result = await marketplace.createProduct('iPhone X','https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png','nice car', web3.utils.toWei('1', 'Ether'), { from: seller })
      productCount = await marketplace.productCount()
    })

    it('creates products', async () => {
      // SUCCESS
      assert.equal(productCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
      assert.equal(event.name, 'iPhone X', 'name is correct')
      assert.equal(event.nameimg, 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', 'nameimg is correct')
      assert.equal(event.desc, 'nice car', 'desc is correct')
      assert.equal(event.price, '1000000000000000000', 'price is correct')
      assert.equal(event.owner, seller, 'owner is correct')
      assert.equal(event.purchased, false, 'purchased is correct')

      // FAILURE: Product must have a name
       await marketplace.createProduct('','https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png','nice car', web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected;
      // FAILURE: Product must have a nameimg
       await marketplace.createProduct('iPhone X','','nice car', web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected;
      // FAILURE: Product must have a desc
       await marketplace.createProduct('iPhone X','https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png','', web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected;


            // FAILURE: Tries to buy a product that does not exist, i.e., product must have valid id
            await marketplace.purchaseProduct(99, { from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;

            // FAILURE: Buyer tries to buy without enough ether
            await marketplace.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('0.5', 'Ether')}).should.be.rejected;
      
            // FAILURE: Deployer tries to buy the product, i.e., product cannot be purchased twice
            await marketplace.purchaseProduct(productCount, { from: deployer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
      
            // FAILURE: Buyer tries to buy again, i.e., buyer cannot be the seller
            await marketplace.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
          })
        })
    })
      