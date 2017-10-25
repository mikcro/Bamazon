USE bamazon;


CREATE TABLE products (

	ID INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (100),
    department_name VARCHAR (100),
    price DECIMAL(4, 2) ,
    stock_quantity INT(100),
    PRIMARY KEY(id)
    
    
);

UPDATE products
SET stock_quantity = 100
WHERE id=7;

INSERT INTO products(stock_quantity)
VALUES(100);

SELECT * FROM products 