import React, { Component } from 'react';

class Dashboard extends Component {

  render() {
    return (
      <div style={content_style} id="content">
        <p>&nbsp;</p>
        <h2>Buy CAR</h2>

      
        
        <table className="table">
          <thead>
       
          </thead>
          <div style={marketplace_st}>
         
            { this.props.products.map((product, key) => {
              return(
              
             

               
                <tr key={
                  !product.purchased
                  ?key
                :null
                }>

                 

                 
           <div  style={card_st} >
                    {
                    !product.purchased ?

                    <img src={product.nameimg}  alt="" width="100%"   /> :
                    null
                    }
            <p style={p_st}>
              {
                    !product.purchased
                    
                    ?product.name
                  
                    :null
                  }
            
            
            </p>
            <p style={p_st}>product price:
            {
                    !product.purchased
                    
                    ?window.web3.utils.fromWei(product.price.toString(), 'Ether')
                  
                    :null
                  } ETH

            </p>
            <p style={p_st}>Description:
            {
                    !product.purchased
                    
                    ?product.desc
                  
                    :null
                  }
            
             </p>


                  

              <p style={p_st}>Owner:<br/>
                    {
                        !product.purchased
                        
                        ?product.owner
                      
                      :null
                      }
                  
              </p>

            <div  >


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
            
            
            
            
            </div>
            <br/>
            <div class="read">
            <button
  name={product.id}
  value={product.price}
  onClick={(event) => {
    const productId = event.target.name;
    //const newPrice = event.target.value;
    const newPrice = prompt("Enter the new Price:");
    const newName = prompt("Enter the new name:");
    const newNameimg = prompt("Enter the new image URL:");
    const newDesc = prompt("Enter the new description:");
    const newPriceInWei = window.web3.utils.toWei(newPrice.toString(), 'Ether');

    this.props.editProduct(productId, newName, newNameimg, newDesc, newPriceInWei);
  }}
>
  Edit
</button>


            </div>
            <br/>
            <div class="read"><button>Remove</button></div>
            <br/>
          </div>
              
                 
                 
                  
                 
                </tr>
              )
            })}
            
         </div>
        </table>
   


      </div>
    );
  }
}

export default Dashboard;
const content_style = {

  color: "white",
  backgroundColor: "#282c34",
  width:'100%',

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