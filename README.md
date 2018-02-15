# Bamazon
Shopping and inventory app

![Bamazon - like Amazon but smaller.](/images/Bamazon.png)

##Video 
![Bamazon - like Amazon but smaller.](/video/Bamazon.mp4)

## Description
* Demonstrate use of SQL in Node.js.

* List of products with inventory is displayed using console.table

* Customer is prompted to pick a product to buy using the NPM package inquirer and then how many to buy. 
    * If inventory is available than the purchase successful.
        * Inventory is updated in the database using an update query
        * The total cost of the purchase is displayed.
    * If inventory is not available than the purchase fails.

* After each request, the customer is given the option to buy more.

## Instructions
* Clone repository
* First time: 
    * In a command or terminal window, run 'npm install' in same directory as js file.
    * Run SQL schema.sql to create database and tables.
    * Run SQL seed.sql to build a sample list of products.
    * To run: in a command or terminal window, run 'node bamazonCustomer.js'

## Frameworks and libraries
* Node.js
* NPM Package : Inquirer : https://www.npmjs.com/package/inquirer
* NPM Package : MySQL : https://www.npmjs.com/package/mysql
* NPM Package : Console.table : https://www.npmjs.com/package/console.table
