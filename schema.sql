DROP DATABASE IF EXISTS Bamazon_DB; 
CREATE DATABASE Bamazon_DB;

USE Bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_qty INT NULL,
  PRIMARY KEY (item_id)
  );

