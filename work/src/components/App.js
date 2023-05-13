import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import Marketplace from "../abis/Marketplace.json";
import Navbar from "./Navbar";
import Main from "./Main";
import Mainnew from "./Mainnew";
import Dashboard from "./Dashboard";
import Dashboard2 from "./Dashboard2";
import   useState  from 'react';



class AppMain extends Component {
  
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    console.log({ accounts });
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = Marketplace.networks[networkId];
    if (networkData) {
      const marketplace = new web3.eth.Contract(
        Marketplace.abi,
        networkData.address
      );
      
      this.setState({ marketplace });
      const productCount = await marketplace.methods.productCount().call();
      this.setState({ productCount });
      // Load products
      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call();
        this.setState({
          products: [...this.state.products, product],
        });
      }
      this.setState({ loading: false });
    } else {
      window.alert("Marketplace contract not deployed to detected network.");
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      productCount: 0,
      products: [],
      soldProducts: [],
      loading: true,
      showDashboard1:false,
      showDashboard2: false,
      showDashboard3: false,
      addcarshow:false,
     
    };

  
  }



  
  createProduct = (name, nameimg, desc, price) => {
    this.state.marketplace.methods.createProduct(name, nameimg, desc, price).send({ from: this.state.account })
      .on('transactionHash', (hash) => {
        // Transaction in progress
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        // Transaction confirmed
      })
      .on('error', (error, receipt) => {
        // Error occurred
      });
  };
  
  editProduct = (id, newName, newNameimg, newDesc, newPrice) => {
    this.state.marketplace.methods.editProduct(id, newName, newNameimg, newDesc, newPrice).send({ from: this.state.account })
      .on('transactionHash', (hash) => {
        // Transaction in progress
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        // Transaction confirmed
      })
      .on('error', (error, receipt) => {
        // Error occurred
      });
  };
  
  removeProduct = (id) => {
    this.state.marketplace.methods.removeProduct(id).send({ from: this.state.account })
      .on('transactionHash', (hash) => {
        // Transaction in progress
      })
      .on('confirmation', (confirmationNumber, receipt) => {
        // Transaction confirmed
      })
      .on('error', (error, receipt) => {
        // Error occurred
      });
  };

  buyProduct = (id, price) => {
    this.setState({ loading: true });
    const { products, marketplace, account } = this.state;
  
    // Find the product to purchase
    const product = products.find((product) => product.id === id);

    
  
    // Purchase the product
    marketplace.methods
      .purchaseProduct(id)
      .send({ from: account, value: price })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
  
        // Update the soldProducts state variable with the old owner's information
        const soldProduct = {
          id: id,
          oldOwner: product.owner
        }
        this.setState({ soldProducts: [...this.state.soldProducts, soldProduct] });
      });
  };
 

 
  createProduct = (name,nameimg,desc, price) => {
    this.setState({ loading: true });
    this.state.marketplace.methods
      .createProduct(name,nameimg,desc, price)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
        window.location.reload(true);
      });
  };/*
  createProduct = (name, price) => {
    this.setState({ loading: true });
    this.state.marketplace.methods
      .createProduct(name, price)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
        window.location.reload(true);
      });
  };
  */
  purchaseProduct = (id, price) => {
    this.setState({ loading: true });
    this.state.marketplace.methods
      .purchaseProduct(id)
      .send({ from: this.state.account, value: price })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  };

  

  render() {
    const { showDashboard1,showDashboard2,showDashboard3, products } = this.state;
    return (
      <div>
        
        
        
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.dappuniversity.com/bootcamp"
          target="_blank"
          rel="noopener noreferrer"
        >
           Blockchain Marketplace
      
        </a>

        
<button style={{ width: "100px", height: "50px" }} onClick={() => this.setState({ showDashboard1: true, showDashboard2: false, showDashboard3: false })}>
  {this.state.showDashboard1 ? "Sale" : "Show Sale"}
</button>

<button style={{ width: "100px", height: "50px" }} onClick={() => this.setState({ showDashboard2: true, showDashboard1: false, showDashboard3: false })}>
  {this.state.showDashboard2 ? "Buy" : "Show Buy"}
</button>

<button style={{ width: "100px", height: "50px" }} onClick={() => this.setState({ showDashboard3: true, showDashboard1: false, showDashboard2: false })}>
  {this.state.showDashboard3 ? "Dashboard" : "Show Dashboard"}
</button>

<button
        onClick={() => {
          localStorage.removeItem("email");
          localStorage.removeItem("account");
          window.location.reload();
        }}
      >
        {" "}
        Log out
      </button>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white"><span id="account">{this.props.account}</span></small>    
          </li>
        </ul>
      </nav>
        
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              {" "}
{/*
            <button onClick={() => this.setState({ showDashboard2: !this.state.showDashboard2, showDashboard3: false })}>
              {showDashboard2 ? "Hide Dashboard" : "Show Dashboard"}
              </button>

               <button onClick={() => this.setState({ showDashboard3: !this.state.showDashboard3, showDashboard2: false })}>
              {showDashboard3 ? "Hide Dashboard" : "Show Dashboard"}
              </button>



              <button onClick={() => this.setState({ showDashboard2: !this.state.showDashboard2, showDashboard3: false })}>
  {this.state.showDashboard2 ? "Hide Dashboard 2" : "Show Dashboard 2"}
</button>

<button onClick={() => this.setState({ showDashboard3: !this.state.showDashboard3, showDashboard2: false })}>
  {this.state.showDashboard3 ? "Hide Dashboard 3" : "Show Dashboard 3"}
      </button> */}



<br/>

              {this.state.loading ? (
                <div id="loader" className="text-center">
                  <p className="text-center"> Loading... </p>{" "}
                </div>
              ) : showDashboard1 && (
                <Main
                  products={this.state.products}
                  createProduct={this.createProduct}
                  purchaseProduct={this.purchaseProduct}
                />

               

              )}
               


              {this.state.loading ? (
                <div id="loader" className="text-center">
                  <p className="text-center"> Loading... </p>{" "}
                </div>
              ) : showDashboard3 && (
                <Mainnew
                  products={this.state.products}
                  createProduct={this.createProduct}
                  purchaseProduct={this.purchaseProduct}
                  soldProducts={this.state.soldProducts}
                />

               

              ) }
       
            
                { showDashboard2 &&  (
                <Dashboard2
                  products={this.state.products}
                 createProduct={this.createProduct}
                  purchaseProduct={this.purchaseProduct}
                  editProduct={this.editProduct}
                
                /> 

             

              ) }

              
              
              {" "}
            </main>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    

  
); 
  }
}




export default AppMain;
