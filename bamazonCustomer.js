const mySQL = require("mySQL");
const inquirer = require("inquirer");

// display all products with ID, name, and product
var connection = mySQL.createConnection({
    host: 'localhost', // not needed - localhost is the default
    port: '3306',      // not needed - 3306 is the default
    user: 'root', 
    password: 'Umber33$',
    database: 'bamazon_db' // optional but qualifying the table name in query would be required
});

displayProducts(); // start by showing all products

function displayProducts() {
    // preferred connect from NPM documentation 
    connection.connect(function(error) {
        if (error) {
            console.error('error connecting: ', error.stack);
            return;
        }
        console.log('connected as id: ', connection.threadId);
    });
    // preferred query from NPM documentation
    connection.query('SELECT * FROM products', function (error, results) {
        if (error) {
            console.error('error with query: ', error.stack);
            return;
        }
        // console.log(results);
        // loop through results and display
        var listOfIDs=[]; // list of IDs to be used for validation
        for (var i=0; i<results.length; i++) {
            console.log(`ID: ${results[i].item_id} | Name: ${results[i].product_name} | Price: $ ${results[i].price}`); // ES6 tic notation
            listOfIDs.push(results[i].item_id);
        };
        // close connection
        // connection.end();
        // go to prompt
        customerBuy(listOfIDs);
    });
};

function customerBuy(listOfIDs) {
    // prompt user to select ID of product to buy
    // questions in an array from NPM documentation
    var questions = [
        {
            type: "input",
            name: "buyId",
            message: "What product do you want to buy? (Use ID number.)",
            validate: function(value) {
                var valid = listOfIDs.indexOf(value) > -1; // return true if input ID is in list of IDs
                return valid || 'Please enter a valid ID.';
            },
            filter: Number   
        },
        {
            type: "input",
            name: "buyQty",
            message: "How many?",
            validate: function(value) {
                var valid = (!isNaN(parseFloat(value))) && (parseFloat(value) > 0);
                return valid || 'Please enter a number.';
                },
            filter: Number
        }
    ];
    // using questions array to prompt user
    inquirer.prompt(questions).then(function(answers) {
        // console.log(answers);
        checkInventory(answers.buyId, answers.buyQty)
    });
};

// check inventory against how many
function checkInventory(buyId, buyQty) {
console.log(`ID: ${buyId} Qty: ${buyQty}`);
// if not enough - display message and start over

// if enough - deduct from stock qty and show total of purchase

    // preferred query from NPM documentation
    connection.query(`SELECT * FROM products WHERE item_id = ${buyId}`, function (error, results) {
        if (error) {
            console.error('error with query: ', error.stack);
            return;
        }
        var availableQty = results[0].stock_qty;
        if (availableQty < buyQty) {
            console.log(`Insufficient quantity available. Requested: ${buyQty} Available: ${availableQty}`);
            return;
        } else {
            console.log("reduce inventory");
            connection.query('UPDATE stock_qty ')
        }
        // loop through results and display
        for (var i=0; i<results.length; i++) {
            console.log(`ID: ${results[i].item_id} | Available: ${results[i].stock_qty} | Price: $ ${results[i].price}`); // ES6 tic notation
        };
    });

};