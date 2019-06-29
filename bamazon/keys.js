console.log('this is loaded');
require("dotenv").config();

exports.database = {
    host: "localhost",
    user: "root",
    password: process.env.databaseKey,
    database: "bamazon_db",
    port: 3306
};
