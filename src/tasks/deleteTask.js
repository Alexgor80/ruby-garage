var mysql = require('../utils/mysql');

module.exports = function (req, res) {
    var id = req.params.id;

    mysql.query('DELETE FROM tasks WHERE id = ?', [id], function (error, results, fields) {
        if (error) throw error;
        res.send('deleted ' + results.affectedRows + ' rows');
    });
};