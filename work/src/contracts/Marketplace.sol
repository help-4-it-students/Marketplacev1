// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Marketplace {
    string public name;
    uint public productCount = 0;

    mapping(uint => Product) public products;
    mapping(uint => Transaction[]) public productTransactions;

    struct Product {
        uint id;
        string name;
        string nameimg;
        string desc;
        uint price;
        address payable owner;
        bool purchased;
    }

    struct Transaction {
        address buyer;
        uint price;
        uint timestamp;
    }

    event ProductCreated(
        uint id,
        string name,
        string nameimg,
        string desc,
        uint price,
        address payable owner,
        bool purchased
    );

    event ProductPurchased(
        uint id,
        string name,
        string nameimg,
        string desc,
        uint price,
        address payable owner,
        bool purchased
    );

    constructor() {
        name = "Marketplace";
    }

    function createProduct(
        string memory _name,
        string memory _nameimg,
        string memory _desc,
        uint _price
    ) public {
        require(bytes(_name).length > 0);
        require(_price > 0);
        productCount++;

        Product memory newProduct = Product(
            productCount,
            _name,
            _nameimg,
            _desc,
            _price,
            payable(msg.sender),
            false
        );
        products[productCount] = newProduct;
        emit ProductCreated(
            productCount,
            _name,
            _nameimg,
            _desc,
            _price,
            payable(msg.sender),
            false
        );
    }

    function purchaseProduct(uint _id) public payable {
        Product memory _product = products[_id];
        address payable _seller = _product.owner;

        require(_product.id > 0 && _product.id <= productCount);
        require(msg.value >= _product.price);
        require(!_product.purchased);
        require(_seller != msg.sender);

        _product.owner = payable(msg.sender);
        _product.purchased = true;
        products[_id] = _product;

        Transaction memory newTransaction = Transaction(
            msg.sender,
            _product.price,
            block.timestamp
        );
        productTransactions[_id].push(newTransaction);

        emit ProductPurchased(
            _id,
            _product.name,
            _product.nameimg,
            _product.desc,
            _product.price,
            payable(msg.sender),
            true
        );
    }

    function editProduct(
        uint _id,
        string memory _newName,
        string memory _newNameimg,
        string memory _newDesc,
        uint _newPrice
    ) public {
        Product storage _product = products[_id];
        require(_product.id == _id);
        require(!_product.purchased);

        _product.name = _newName;
        _product.nameimg = _newNameimg;
        _product.desc = _newDesc;
        _product.price = _newPrice;

        products[_id] = _product;
    }

    function removeProduct(uint _id) public {
        Product storage _product = products[_id];
        require(_product.id == _id);
        require(!_product.purchased);

        delete products[_id];
    }

    function getTransactionHistory(uint _id)
        public
        view
        returns (Transaction[] memory)
    {
        return productTransactions[_id];
    }
}