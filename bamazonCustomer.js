var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'bamazon2'
});
 
connection.connect();

var products;

connection.query('SELECT item_id, product_name, price, stock_quantity FROM products', function (error, results, fields) {
  if (error) throw error;
  for(var i = 0; i < results.length; i++) {
    console.log(results[i].item_id + " " + results[i].product_name + " " + results[i].price);
  }
  products = results;
  promptUser();
});
 
function promptUser() {
  var inquirer = require('inquirer');
  var questions = [
    {
      name: "id",
      message: "Which product ID would you like to purchase?",  
    },{
      name: "units",
      message: "How many would you like to buy?"

    }
  ]
  inquirer.prompt(questions).then(function(answers) {
    var item;
    for( var i = 0; i < products.length; i++ ) {
      if(answers.id == products[i].item_id) {
        item = products[i];
        break;
      }
    }
    if(!item) {
      console.log("ID incorrect");
      connection.end();
      process.exit();
    }
    if()
  });
}



// The app should then prompt users with two messages.

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.

// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
// However, if your store does have enough of the product, you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.