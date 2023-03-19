const { assert } = require("chai")
const { default: Web3 } = require("web3")

const Marketplace = artifacts.require('./Marketplace.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

  
contract('Marketplace',([deployer,seller,buyer]) =>{
    let marketplace

    before(async () =>{
        marketplace = await Marketplace.deployed()
    })

    describe('deployment',async () =>{
      it('deplys successfully', async () => {
        const address = await marketplace.address
        assert.notEqual(address,0x0)
        assert.notEqual(address,'')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
      }) 
      
      it('has a name', async () =>{
        const name = await marketplace.name()
        assert.equal(name,'UTAS Market')
      })

    })



    describe('products',async () =>{
      let result,productCount

      before(async () =>{
        result = await marketplace.createProduct('BMW 2022', 'https://www.hostinger.com/h-assets/images/banner/ukraine-flag-1x.webp', web3.utils.toWei('1','Ether'),{from :seller })
        productCount = await marketplace.productCount()
      })
      
      it('creates products', async () =>{
      //  const name = await marketplace.name()
       // assert.equal(name,'UTAS Market')

       //success (work)
       assert.equal(productCount,1)
       const event = result.logs[0].args
       assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
       assert.equal(event.name, 'BMW 2022', 'name is correct')
       assert.equal(event.nameimg, 'https://www.hostinger.com/h-assets/images/banner/ukraine-flag-1x.webp', 'pic is correct')    
       assert.equal(event.price, '1000000000000000000', 'name is correct')  
       assert.equal(event.owner, seller , 'owner is correct')  
       assert.equal(event.purchased, false , 'purchased is correct')  

       await await marketplace.createProduct('', 'https://www.hostinger.com/h-assets/images/banner/ukraine-flag-1x.webp', web3.utils.toWei('1','Ether'),{from :seller } ).should.be.rejected;

       await await marketplace.createProduct('BMW 2022', '', web3.utils.toWei('1','Ether'),{from :seller } ).should.be.rejected;
       await await marketplace.createProduct('', 'https://www.hostinger.com/h-assets/images/banner/ukraine-flag-1x.webp', 0,{from :seller } ).should.be.rejected;


      })

      

      it('lists products', async () =>{


        const product = await marketplace.products(productCount)
 
        assert.equal(product.id.toNumber(), productCount.toNumber(), 'id is correct')
        assert.equal(product.name, 'BMW 2022', 'name is correct')
        assert.equal(product.nameimg, 'https://www.hostinger.com/h-assets/images/banner/ukraine-flag-1x.webp', 'pic is correct')    
        assert.equal(product.price, '1000000000000000000', 'name is correct')  
        assert.equal(product.owner, seller , 'owner is correct')  
        assert.equal(product.purchased, false , 'purchased is correct')  
        })

        it('sells products', async () =>{



          })


    })

})