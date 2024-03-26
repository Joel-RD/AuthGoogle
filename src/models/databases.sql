-- Create a new database called 'DatabaseName'

CREATE DATABASE AppClient;


CREATE TABLE "users" ( id SERIAL PRIMARY KEY,
                                        name VARCHAR(30),
                                             email TEXT);


INSERT INTO "users" (name,
                    email)
VALUES ('joel',
        'joel@gmail.com'), ('eudy',
                            'eudy@gmail.com');

