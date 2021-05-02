"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require('mysql');
/*
const pool = mysql.createPool(keys.database);

pool.getConnection()
    .then(connection => {
        pool.releaseConnection(connection)
        console.log('DB is connected');
    });*/
const pool = mysql.createConnection({
    host: 'donjuancho.mysql.database.azure.com',
    user: 'juancho@donjuancho',
    password: 'Pollas1.',
    database: 'blockbusted',
    port: 3306,
    ssl: true
});
pool.connect(error => {
    if (error)
        throw error;
    console.log("Successfully connected to the database.");
});
exports.default = pool;
