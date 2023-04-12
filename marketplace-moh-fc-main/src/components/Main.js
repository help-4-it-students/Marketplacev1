import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h1>Add_CAR</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.productName.value
          const nameimg = this.productNameimg.value
          const desc=this.productDec.value
          const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          this.props.createProduct(name, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Car name:"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productNameimg"
              type="text"
              ref={(input) => { this.productNameimg = input }}
              className="form-control"
              placeholder="Car img:"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productDec"
              type="text"
              ref={(input) => { this.productDec = input }}
              className="form-control"
              placeholder="Car Desc:"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => { this.productPrice = input }}
              className="form-control"
              placeholder="Car Price:"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Car</button>
        </form>
        <p>&nbsp;</p>
 
      </div>
    );
  }
}

export default Main;
