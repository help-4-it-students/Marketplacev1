import React, { Component } from 'react';

class Dashboard extends Component {

  render() {
    return (
      <div style={content_style} id="content">
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
            { this.props.products && this.props.products.length > 0 && this.props.products.map((product, key) => {
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
        <div style={marketplace_st}>


        <div  style={card_st} >
           <img src='https://i.ibb.co/LhpBYWV/alicelioness-uplight-4e4d744a-7067-430c-b47f-894867979588.png'  alt="Car" width="100%"  />
            <p style={p_st}>Name: Car</p>
            <p style={p_st}>Price: 3ether</p>
            <p style={p_st}>Description: ---------------------------------------</p>
            <div  ><button>Buy Now</button></div>
            <br/>
            <div class="read"><button>Edit</button></div>
            <br/>
            <div class="read"><button>Remove</button></div>
            <br/>
          </div>

          <div  style={card_st} >
           <img src='https://i.ibb.co/LhpBYWV/alicelioness-uplight-4e4d744a-7067-430c-b47f-894867979588.png'  alt="Car" width="100%"  />
            <p style={p_st}>Name: Car</p>
            <p style={p_st}>Price: 3ether</p>
            <p style={p_st}>Description: ---------------------------------------</p>
            <div  ><button>Buy Now</button></div>
            <br/>
            <div class="read"><button>Edit</button></div>
            <br/>
            <div class="read"><button>Remove</button></div>
            <br/>
          </div>
    

          


        </div> 


      </div>
    );
  }
}

export default Dashboard;
const content_style = {

  color: "blue",
  backgroundColor: "#green",

};

const marketplace_st = {
  backgroundColor: "#282c34",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "calc(10px + 2vmin)",
  color: "white",
  display: "grid",
  gap: "1rem",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  padding: "20px"
};

const card_st = {
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
  backgroundColor: "white",
  color: "black",
  maxWidth: "400px",
  margin: "10%",
  textAlign: "center",
  fontFamily: "arial",
};

const p_st = {
  padding: "5%",
  fontSize: "22px",
  textAlign: "justify",
  textJustify: "inter-word",
};
const buyButton_st = {
  border: "none",
  outline: "0",
  padding: "12px",
  color: "black",
  backgroundColor: "rgb(240, 96, 96)",
  textAlign: "center",
  cursor: "pointer",
  width: "80%",
  fontSize: "18px",
};