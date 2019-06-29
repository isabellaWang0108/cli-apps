DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE  bamazon_db;

CREATE TABLE items(
			id INTEGER AUTO_INCREMENT NOT NULL,
			name VARCHAR(30) NOT NULL,
            department_name varchar(30) NOT NULL,
           price INTEGER(10),
           sale_price INTEGER(10),
           stock_quantity INTEGER(10),
           PRIMARY KEY (id)
 );
 
 INSERT INTO items (name,department_name,price, sale_price, stock_quantity)
 VALUES("brush","personal care",2,3,100);
 
  INSERT INTO items (name,department_name,price, sale_price, stock_quantity)
 VALUES("apple","food",1,2,200);
 
  INSERT INTO items (name,department_name,price, sale_price, stock_quantity)
 VALUES("banana","food",1,2,1000);
 
  INSERT INTO items (name,department_name,price, sale_price, stock_quantity)
 VALUES("toast","food",2,3,10);
 
  INSERT INTO items (name,department_name,price, sale_price, stock_quantity)
 VALUES("sun scream","personal care",20,30,100);
 
  INSERT INTO items (name,department_name,price, sale_price, stock_quantity)
 VALUES("razor","personal care",10,13,50);
 
  INSERT INTO items (name,department_name,price, sale_price, stock_quantity)
 VALUES("water","drinks",1,1.5,1000);
 
  INSERT INTO items (name,department_name,price, sale_price, stock_quantity)
 VALUES("apple juice","drinks",2,3,60);
 
  INSERT INTO items (name,department_name,price, sale_price, stock_quantity)
 VALUES("salt","seasoning",2,3,200);
 
  INSERT INTO items (name,department_name,price, sale_price, stock_quantity)
 VALUES("ketchup","seasoning",3,4,400);
 
 SELECT *FROM items;