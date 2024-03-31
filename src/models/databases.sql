-- Create a new database called 'DatabaseName'
CREATE DATABASE AppClient;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    filename TEXT UNIQUE NOT NULL,
);
