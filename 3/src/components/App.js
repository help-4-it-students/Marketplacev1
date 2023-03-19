import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';
import { ethers } from 'ethers';
import Marketplace from '../abis/Marketplace.json'
import Navbarr from './Navbar';
import Mainfile from './Mainfile';

class App extends Component {


  async componentWillMount(){

    await this.loadWeb3()
    await this.loadBlockchaindata()
    console.log(window.web3)
  }

  async componentDidMount() {
    try {
      await this.loadWeb3();
    } catch (error) {
      console.error(error);
    }
  }

  async loadWeb3() {
    // Check if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.ethereum !== 'undefined') {
      window.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        // Accounts now exposed
        const accounts = await window.web3.eth.getAccounts();
        console.log(accounts);
      } catch (error) {
        // User denied account access
        console.error(error);
      }
    } else {
      console.log('No web3 detected. You should consider trying MetaMask!');
    }


  }

  constructor(props){
    super(props)
    this.state = {
      account:'',
      productCount: 0,
      products:[],
      loading:true
      
    }
    
    this.createProduct = this.createProduct.bind(this)
   
  }
  
 

  async loadBlockchaindata(){
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    console.log('hi')
    const networdId = await web3.eth.net.getId()
    console.log(networdId)
    console.log('hi123')


    this.setState({ account: accounts[0] })

    const networdData = Marketplace.networks[networdId]
    if(networdData){

      const marketplace = web3.eth.Contract(Marketplace.abi, networdData.address)
      console.log(marketplace)
      this.setState({marketplace})
      const productCount = await marketplace.methods.productCount().call()
      console.log(productCount)
      console.log('new york')
      this.setState({loading : false})
     
    }
    else {
      window.alert('Marketplace contract not deployed network')

    }
    

console.log(this.state.loading )
console.log('way')
  }

/* try new one
createProduct = async (name, price) => {
  if (!this.state.marketplace) {
    console.log('marketplace object is undefined');
    return;
  }
  this.setState({ loading: true });
  await this.state.marketplace.methods
    .createProduct(name, price)
    .send({ from: this.state.account })
    .once('receipt', receipt => {
      this.setState({ loading: false });
    });
}
*/
 

createProduct = async (name, price) => {
  if (!this.state.marketplace) {
    console.log('marketplace object is undefined');
    return;
  }
  this.setState({ loading: true });
  try {
    
    await this.state.marketplace.methods
      .createProduct(name, price)
      .send({ from: this.state.account })
      .once('receipt', receipt => {
        this.setState({ loading: false });
        
      });
  } catch (error) {
    console.log('Error creating product: ', error);
    this.setState({ loading: false });
  }
}


/*
createProduct(name,price){
  this.setState({ loading: true });
  this.state.marketplace.methods.createProduct(name,price).send({from: this.state.account}).once('recepit',(receipt) => {this.setState.loading({loading:false})
})
}*/

 
  render() {
    return (
      <div>
       <Navbarr account={this.state.account} />

        <div className="container-fluid mt-5">
          <div className="row">

            <main role="main" className="col-lg-12 d-flex text-center">
              {this.state.loading 
              ? <div id='loader' className='text-center'><p className='text-center'>Loading...</p></div> 
              
              : <Mainfile createProduct={this.createProduct} /> 
              }
              

            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
