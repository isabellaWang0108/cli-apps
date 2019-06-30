var inquirer = require("inquirer");
var mysql = require("mysql");
var keys = require("./keys.js");


var connection = mysql.createConnection(
    keys.database
);

inquirer.prompt({
    name: "choice",
    type: "list",
    message: "What you wanna do today?",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
}).then(function (reply) {
    switch (reply.choice) {
        case "View Products for Sale":
            // list every available item: the item IDs, names, prices, and quantities.
            display();
            break;

        case "View Low Inventory":
            // * list all items with an inventory count lower than five.
            listLowerThan5();
            break;

        case "Add to Inventory":
            //  display a prompt that will let the manager "add more" of any item currently in the store.
            inquirer.prompt({
                name: "add",
                type: "input",
                message: "Please enter the id of the product that you wanna add"
            }).then(function (reply2) {
                inquirer.prompt({
                    name: "number",
                    type: "input",
                    message: "How many items you want to add?"
                }).then(function (reply3) {
                    var idOfItem = reply2.add;
                    var numberAdd = reply3.number;
                    addItems(idOfItem, numberAdd);
                })

            })
            break;

        case "Add New Product":
            // add a completely new product to the store.
            addNewProduct();
            break;

    }

});


function display() {
    connection.query("SELECT *FROM items", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        for (var i = 0; i < res.length; i++) {
            console.log("--------------------------------");
            console.log("item id: " + res[i].id);
            console.log("item name: " + res[i].name);
            console.log("item price: $" + res[i].price);
            console.log("sale price: $" + res[i].sale_price);
            console.log("quantity: " + res[i].stock_quantity);

        }

        connection.end();
    });
};

function listLowerThan5() {
    connection.query("SELECT *FROM items", function (err, res) {
        if (err) throw err;
        var count = 0;
        // Log all results of the SELECT statement
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5) {
                console.log("--------------------------------");
                console.log("item id: " + res[i].id);
                console.log("item name: " + res[i].name);
                console.log("item price: $" + res[i].price);
                console.log("sale price: $" + res[i].sale_price);
                console.log("quantity: " + res[i].stock_quantity);
                count++;
            }
        }
        if (count === 0) {
            console.log("no products are with an low inventory")
        }
        connection.end();
    });
};




function addItems(idOfItem, numberAdd) {
    var query = connection.query(
        "UPDATE items SET stock_quantity=stock_quantity+" + parseInt(numberAdd) + " WHERE id=" + parseInt(idOfItem),
        function (err, result) {
            if (err) throw err;
            display();
        }
    );

};

function addNewProduct() {
    inquirer.prompt([{
        name: "name",
        type: "input",
        message: "What's the name of product?"
    },{
        name: "department",
        type: "input",
        message: "What's the department?"
    },{
        name: "price",
        type: "input",
        message: "What's the price?"
    },{
        name: "salePrice",
        type: "input",
        message: "What's the sale price?"
    },{
        name: "quantity",
        type: "input",
        message: "What's the stock quantity?"
    }]).then(function(answer){
        connection.query("INSERT INTO items (name,department_name,price, sale_price, stock_quantity) VALUES('"+answer.name+"','"+answer.department+"',"+answer.price+","+answer.salePrice+","+answer.quantity+")", function (err, res) {
            if (err) throw err;
            display();
        }
        );
    })

}