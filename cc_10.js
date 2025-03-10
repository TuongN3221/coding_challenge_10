// Task 1 - Creating Product Class
class Product {
    constructor(name, id, price, stock) {
        this.name = name,
        this.id = id,
        this.price = price,
        this.stock = stock
    };// Sets up the class Product and its parameters
    getDetails() {
        return `Item: ${this.name}, ID: ${this.id}, Price: $${this.price}, Available Stock: ${this.stock}`
    }// Returns the product details as template literal
    updateStock(quantity){
       if(quantity > this.stock) {
        return `Not Enough Available Stock For This Item`; 
       }// Returns this output if the order's quantity greater than inventory stock
       this.stock -= quantity;// Reduces stock by quantity when order is placed
    }
};
const prod1 = new Product("Laptop", 101, 1200, 10);
console.log(prod1.getDetails());// Expected output: "Product: Laptop, ID: 101, Price: $1200, Stock: 10"
prod1.updateStock(3);
console.log(prod1.getDetails()); // Expected output: "Product: Laptop, ID: 101, Price: $1200, Stock: 7"

// Task 2 - Creating an Order Class
class Order {
    constructor(orderId, product, quantity) {
        this.orderId = orderId,
        this.product = product,
        this.quantity = quantity

        this.product.updateStock(this.quantity)// Reduce inventory stock when order is placed
    }
    getOrderDetails(){
        const totalPrice = this.product.price * this.quantity
        return `Order ID: ${this.orderId}, Product: ${this.product.name}, Quantity: ${this.quantity}, Total Price: $${totalPrice}`;
    }// Calculates the total price of the order from arrays in this class and in the Order Class
};
const order1 = new Order(501, prod1, 2);
console.log(order1.getOrderDetails()); // Expected output: "Order ID: 501, Product: Laptop, Quantity: 2, Total Price: $2400"
console.log(prod1.getDetails()); // Expected output: "Product: Laptop, ID: 101, Price: $1200, Stock: 5" (Stock reduced)

// Task 3 - Creating an Inventory Class
class Inventory {
    constructor() {
        this.products = []
    }// Sets up empty product array
    addProducts(product) {
        this.products.push(product);// Adds the product to the inventory from the Order class
    }
    listProducts(){
        this.products.forEach(product => console.log(product.getDetails()));
    }// Logs product details from Order class
// Task 4 - Implementing Order Management
    orders = [];
    addProduct(product){
        this.products.push(product);
    }
    listProducts(){
        this.products.forEach(product => console.log(product.getDetails()));
    }
    placeOrder(orderId, product, quantity){
        if (product.stock > quantity) {
            const order = new Order(orderId, product, quantity)// Creates a new order and adds it to the order list if stock is available
            this.orders.push(order)// Adds order to the orders array
        }//If stock is greater than order quantity, creates a new Order object and adds it to orders array
        else {
            console.log(`Order ${orderId} Failed: Insufficient stock for ${product.name}.`)
        }// Ensures that the order will not be placed if there is not enough stock for the order
    }    
    listOrders(){
        this.orders.forEach(order => console.log(order.getOrderDetails()))
    }// Iterates through the order array and logs the details of each order to console
// Task 5 - Implementing Product Restocking
    addProduct(product) {
        this.products.push(product);
    }
    placeOrder(orderId, product, quantity){
        if(product.stock >= quantity) {//Checks if there is enough stock for requested order
            const order = new Order(orderId, product, quantity);
            this.orders.push(order);
        }
        else {
            console.log(`Order ${orderId} failed: Insufficient Stock for ${product.name}`);
        }// Logs error that order cannot be fulfilled due to lack of stock
    }
    restockProduct(productId, quantity) {
        const product = this.products.find(prod => prod.id === productId);// Finds the product to be restocked by ID
        if (product) {
            product.stock += quantity;// Adds new stock for the product to the inventory
            console.log(`${product.name} restocked. New Stock: ${product.stock}`);// Logs the product that is restocked
        } else {
            console.log(`Product ID ${productId} not found.`);// Logs error if product not is not found
        }
    }
};
// Task 3 Test Case
const inventory = new Inventory();
inventory.addProduct(prod1);
inventory.listProducts();// Expected output: "Product: Laptop, ID: 101, Price: $1200, Stock: 5"
// Task 4 Test Cases
inventory.placeOrder(601, prod1, 2);
inventory.listOrders();// Expected output: "Order ID: 601, Product: Laptop, Quantity: 2, Total Price: $2400"
console.log(prod1.getDetails());// Expected output: "Product: Laptop, ID: 101, Price: $1200, Stock: 3"
// Task 5 Test Cases
inventory.restockProduct(101, 5);
console.log(prod1.getDetails()); // Expected output: "Product: Laptop, ID: 101, Price: $1200, Stock: 8"