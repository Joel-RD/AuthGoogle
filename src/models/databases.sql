-- Create a new database called 'DatabaseName'
CREATE DATABASE AppClient;

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    price INTEGER  NOT NULL,
    filename TEXT UNIQUE
);

INSERT INTO users (name, email, filename) VALUES ('John Doe', 'john@example.com', 'profile.jpg');
