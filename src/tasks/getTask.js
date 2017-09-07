var mysql = require('../utils/mysql');

module.exports = function (req, res) {

    mysql.query('SELECT * FROM tasks', function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    });
};