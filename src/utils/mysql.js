var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'sql8.freemysqlhosting.net',
    user     : 'sql8193328',
    password : '7UFnZerrf7',
    database : 'sql8193328'
});

module.exports = connection;