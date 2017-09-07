var mysql = require('../utils/mysql');

module.exports = function (req, res) {
    var id = req.params.id;
    var body = req.body;
    var status = body.status == "true" ? 1 : 0;

    mysql.query('UPDATE tasks SET status = ? WHERE id = ?', [status, id],function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    });
};