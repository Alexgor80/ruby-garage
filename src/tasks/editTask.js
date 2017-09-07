var mysql = require('../utils/mysql');

module.exports = function (req, res) {
    var id = req.params.id;
    var body = req.body;

    mysql.query('UPDATE tasks SET name = ? WHERE id = ?', [body.taskName, id],function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    });
};