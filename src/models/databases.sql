-- Create a new database called 'DatabaseName'
CREATE DATABASE AppClient;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    googleID VARCHAR(400) NOT NULL,
    googleName VARCHAR(100) NOT NULL,
    googleEmail VARCHAR(300) UNIQUE NOT NULL
);

Create TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    price INTEGER NOT NULL,
    filename TEXT UNIQUE NOT NULL,
    FOREIGN KEY (id) REFERENCES users(id)
);
