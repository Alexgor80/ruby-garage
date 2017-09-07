var mysql = require('../utils/mysql');

module.exports = function (req, res) {
    var projects = [];
    mysql.query('SELECT * FROM projects', function (error, results, fields) {
        if (error) throw error;
        results.forEach(function (result) {
            mysql.query('SELECT * FROM tasks WHERE `project_id` = ?', [result.id], function (error, tasks, fields) {
                if (error) throw error;
                result.tasks = tasks;
                projects.push(result);
                if (projects.length === results.length){
                    res.send(projects);
                }
            });
        });
    });
};