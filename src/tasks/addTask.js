var mysql = require('../utils/mysql');

module.exports = function (req, res) {
    var body = req.body;

    mysql.query('INSERT INTO tasks SET ?', {name: body.taskName, project_id: body.projectId} , function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    });
};