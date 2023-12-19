const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'project_db',
    port: '8889'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;