var inquirer = require("inquirer");
var mysql = require("mysql");
var keys = require("./keys.js");


var connection = mysql.createConnection(
    keys.database
);

connection.connect(function (err, res) {
    if (err) throw err;
    // console.log("Connected as ID " + connection.threadId);
    display();
});


//  Include the ids, names, and prices of products for sale.

function display() {
    connection.query("SELECT * FROM items", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("--------------------------------");
            console.log("item id: " + res[i].id);
            console.log("item name: " + res[i].name);
            console.log("item price: " + res[i].sale_price);
        }


        //  prompt users with two messages.

        //    * The first should ask them the ID of the product they would like to buy.
        //    * The second message should ask how many units of the product they would like to buy.

        inquirer.prompt({
            name: "productID",
            type: "input",
            message: "Please enter the product ID that you'd like to buy"
        }).then(function (reply) {
            inquirer.prompt({
                name: "number",
                type: "input",
                message: "How many units you'd like to buy?"
            }).then(function (reply2) {
                // select the item from the database
                var idNum = reply.productID;
                var numberBuy = reply2.number
                var numberInStock = res[idNum].stock_quantity;

                // check if your store has enough of the product to meet the customer's request.

                updateProduct(idNum, numberBuy, numberInStock);

            });
        });

    });
};




function updateProduct(idNum, numberBuy, numberInStock) {
    if (numberBuy <= numberInStock) {
        var query = connection.query(
            "UPDATE items SET ? WHERE ?",
            // question marks are placeholder, first ? first object, second ? second object
            [
                {
                    stock_quantity: numberInStock - numberBuy
                },
                {

                    id: idNum
                }
            ],
            function (err, result) {
                if (err) throw err;
                readProducts(idNum,numberBuy);
                // totalCost();
            }
        );
    } else {
        console.log("Insufficient quantity!");
        connection.end();
    }
}


// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.

function readProducts(idNum,numberBuy) {
    connection.query("SELECT sale_price,name,id FROM items WHERE id="+idNum, function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log("--------------------------------");
        console.log("item id: " + res[0].id);
        console.log("item name: " + res[0].name);
        console.log("total cost: "+parseInt(res[0].sale_price)*parseInt(numberBuy));

        connection.end();
    });
}

