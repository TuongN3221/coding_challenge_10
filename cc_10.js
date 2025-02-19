// Task 1 - Creating Product Class
class Product {
    constructor(name, id, price, stock) {
        this.name = name,
        this.id = id,
        this.price = price,
        this.stock = stock
    };// Sets up the class Product
    getDetails() {
        return `Item: ${this.name}, ID: ${this.id}, Price: $${this.price}, Available Stock: ${this.stock}`
    }// Returns the product details in a formatted string
    updateStock(quantity){
       if(quantity > this.stock) {
        return`Not Enough Available Stock For This Item`; 
       }// Determines if there is enough stock for the order to fill
       this.stock -= quantity;// Reduces stock by quantity when order is placed
    }
};
const prod1 = new Product("Laptop", 101, 1200, 10);
console.log(prod1.getDetails());// Expected output: "Product: Laptop, ID: 101, Price: $1200, Stock: 10"
prod1.updateStock(3);
console.log(prod1.getDetails()); // Expected output: "Product: Laptop, ID: 101, Price: $1200, Stock: 7"