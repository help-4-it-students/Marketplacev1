import React, { Component } from 'react';

class Dashboard extends Component {

  render() {
    return (
      <div id="content">
        <p>&nbsp;</p>
        <h2>Buy CAR</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Nameimg</th>
              <th scope="col">Namedesc</th>
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
                  
                  ?product.id.toString()
                  
                  :null
                  }</th>
                  
                  
                  
                  <td>
                    
                    
                    {
                    !product.purchased
                    
                    ?product.name
                  
                    :null
                  }
                    
                    
                    </td>

                    <td>
                    {
                    !product.purchased ?

                    <img src={product.nameimg}  alt="" height="100px" width="100px"  /> :
                    null
                    }

                    
                    </td>

                    <td>
                    
                    
                    {
                    !product.purchased
                    
                    ?product.desc
                  
                    :null
                  }
                    
                    
                    </td>
                 
                 
                 
                 
                  <td>

                    {
                    !product.purchased
                    
                    ?window.web3.utils.fromWei(product.price.toString(), 'Ether')
                  
                    :null
                  }  </td>
                    
               
               
                  <td>{
                  !product.purchased
                  
                  ?product.owner
                
                :null
                }</td>
                  
                  
                  <td>
                  { !product.purchased
                  
                      ? <button
                          name={product.id}
                          value={product.price}
                          onClick={(event) => {
                            this.props.purchaseProduct(event.target.name, event.target.value)
                          }}
                        >
                          Buy go
                        </button>
                      : null
                    }
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

export default Dashboard;
