import React, { Component } from 'react';

class Mainnew extends Component {

  render() {
    return (
      <div id="content">
        <p>&nbsp;</p>
        <h2>Sold CAR</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.products.map((product, key) => {
              return(
                <tr key={
                  !product.purchased
                  ?key
                :null
                }>
                  
                  <th scope="row">{
                  !product.purchased
                  ?null
                  :product.id.toString()
                  
                  
                  }</th>
                  
                  
                  
                  <td>
                    
                    
                    {
                    !product.purchased
                    ?null
                    :product.name
                  
                    
                  }
                    
                    
                    </td>
                 
                 
                 
                 
                  <td>

                    {
                    !product.purchased
                    ?null
                    :window.web3.utils.fromWei(product.price.toString(), 'Ether')
                  
                    
                  }  </td>
                    
               
               
                  <td>{
                  !product.purchased
                  ?null
                  :product.owner
                
              
                }</td>
                  
                  
                  <td>
                 
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Mainnew;
