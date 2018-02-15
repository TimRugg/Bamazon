const mySQL = require("mySQL");
const inquirer = require("inquirer");
const table = require("console.table");

// display all products with ID, name, and product
var connection = mySQL.createConnection({
    host: 'localhost', // not needed - localhost is the default
    port: '3306',      // not needed - 3306 is the default
    user: 'root',
    password: 'Umber33$',
    database: 'bamazon_db' // optional but qualifying the table name in query would be required
});

// preferred connect from NPM documentation 
connection.connect(function (error) {
    if (error) {
        console.error('error connecting: ', error.stack);
        return;
    }
    console.log('connected as id: ', connection.threadId);
});

displayProducts(); // start by showing all products

function displayProducts() {

    var query = "Select item_id as 'ID', product_name as 'Product', price as 'Price' FROM products WHERE stock_qty > 0";
    // preferred query from NPM documentation
    connection.query(query, function (error, results) {
        if (error) {
            console.error('error with query: ', error.stack);
            return;
        }
        // loop through results for list of IDs
        var listOfIDs = []; // list of IDs to be used for validation
        for (var i = 0; i < results.length; i++) {
            listOfIDs.push(results[i].ID);
        };
        console.log("\n");
        console.table(results);
        // go to prompts
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
            message: "What product would you like to buy? (use ID)",
            validate: function (value) {
                var valid = listOfIDs.indexOf(value) > -1; // return true if input ID is in list of IDs
                return valid || 'Please enter a valid ID.';
            },
            filter: Number
        },
        {
            type: "input",
            name: "buyQty",
            message: "How many?",
            validate: function (value) {
                var valid = (!isNaN(parseFloat(value))) && (parseFloat(value) > 0);
                return valid || 'Please enter a number.';
            },
            filter: Number
        }
    ];
    // using questions array to prompt user
    inquirer.prompt(questions).then(function (answers) {
        // send id and qty to be checked and updated
        checkInventory(answers.buyId, answers.buyQty)
    });
};

// check inventory against how many and update
function checkInventory(buyId, buyQty) {
    // query for all fields
    // preferred query from NPM documentation
    connection.query(`SELECT * FROM products WHERE item_id = ${buyId}`, function (error, results) {
        if (error) {
            console.error('error with query: ', error.stack);
            return;
        }
        var availableQty = results[0].stock_qty;
        // if not enough - display message and start over
        if (availableQty < buyQty) {
            console.log(`\nInsufficient quantity available. Requested: ${buyQty} Available: ${availableQty}\n`);
            buyMoreQuestion();
        } else {
            var totalCost = results[0].price * buyQty;
            var newQty = availableQty - buyQty;
            // if enough - deduct from stock qty and show total of purchase
            connection.query('UPDATE products SET ? WHERE ?', [{
                stock_qty: newQty
            }, {
                item_id: buyId
            }], function (err, res) {
                console.log(`\nYour purchase was successful. Total cost \$${totalCost}\n`);
                buyMoreQuestion();
            });
        };
    });
};

function buyMoreQuestion() {
    // ask to continue
    var questions = [
        {
            type: "confirm",
            name: "continue",
            message: "Do you want to buy something else?"
        }
    ];
    // using questions array to prompt user
    inquirer.prompt(questions).then(function (answers) {
        if (answers.continue) {
            displayProducts();
        } else {
            connection.end();
            return;
        }
    });
};