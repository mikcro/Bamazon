var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    Password: "",
    database: "bamazon_db"
});
connection.connect(function(err) {
    if (err) throw err;

    // start();
})
connection.query("SELECT * From products", function(err, result, fields) {
    console.log("Welcome to our Shop, Please take a look at our items!");
    console.log("\n //===============================================\\ \n");
    console.log(result);
    console.log("\n \\===============================================//");
    questions();

});

function questions() {
    inquirer.prompt([{
            name: "id",
            message: "Weve got something you might be looking for, what is the ID of the item are you looking for?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "quantity",
            message: "How many would you like today?"

        }
    ]).then(function(answers) {
        var quantityInput = answers.quantity;
        var idInput = answers.id;
        purchase(idInput, quantityInput);



    });
}

function purchase(id, quantityInput) {

    connection.query('SELECT * From products WHERE id = ' + id, function(error, response) {
        if (error) { console.log(error) };

        if (quantityInput <= response[0].stock_quantity) {

            var totalCost = response[0].price * quantityInput;

            console.log("\n We have those. I'll send your order right away!");
            console.log("Your total will be " + quantityInput + " " + response[0].product_name + " is $" + totalCost + "Thank-You for your business! \n");
            console.log("before query---------------------", quantityInput, id)
            connection.query('UPDATE products SET stock_quantity = stock_quantity - ' + quantityInput + ' WHERE id = ' + id);

            process.exit()
        } else {
            console.log("Were  sorry. We dont have enough of those in stock." + response[0].product_name + "Please feel free to try us again later! \n ");

            process.exit()
        };

    });

};