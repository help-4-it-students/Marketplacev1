pragma solidity ^0.5.0;

contract Marketplace {
    string public name;

    uint public productCount =0;

    mapping(uint => Product)  public products;

    struct Product {
        uint id;
        string name;
        string nameimg;
        uint price;
        address owner;
        bool purchased;
        
    }

    event ProductCreated(
        uint id,
        string name,
        string nameimg,
        uint price,
        address owner,
        bool purchased
    );
 
    constructor() public {
        name = "UTAS Market";
    }
    //, string memory _imgOfCar 
    function createProduct(string memory _name  ,string memory _nameimg  , uint _price) public {
        //Make sure parameters are correct
        require(bytes(_name).length >0);

        require(bytes(_nameimg).length >0);

        require(_price > 0);
        //incorement product
        productCount ++;

        //Create the product
        products[productCount] = Product(productCount, _name, _nameimg , _price, msg.sender, false );
        
        //Trigger on event
        emit ProductCreated(productCount, _name, _nameimg , _price, msg.sender, false);

    }


    function purchaseProducr(uint _id) public payable{
        //fetch the products
        Product memory _product = products[_id];
        //fetch the owner
        address _seller = _product.owner;
        //make sure the product is valid 

        //purchase it (transfer ownership)
        _product.owner = msg.sender;

        //mark as purchased
        _product.purchased = true;

        //update the product
        _product[_id] = _product;

        //pay the seller 





        //trigger an event

    }




}