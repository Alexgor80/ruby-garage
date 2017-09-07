var mysql = require('../utils/mysql');

module.exports = function (req, res) {
    var body = req.body;

    mysql.query('INSERT INTO projects SET ?', {name: body.projectName}, function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    });
};