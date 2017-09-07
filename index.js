var express = require('express');
var app = express();
var mysql = require('./src/utils/mysql');
var bodyParser = require('body-parser');

var addProject = require('./src/projects/addProject');
var getProject = require('./src/projects/getProjects');
var editProject = require('./src/projects/editProject');
var deleteProject = require('./src/projects/deleteProject');

//Task
var addTask = require('./src/tasks/addTask');
var getTask = require('./src/tasks/getTask');
var editTask = require('./src/tasks/editTask');
var checkTask = require('./src/tasks/checkTask');
var deleteTask = require('./src/tasks/deleteTask');

app.use(express.static(__dirname+'/frontend/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//PROJECT
app.get('/project/', getProject);

app.post('/project/', addProject);

app.put('/project/:id', editProject);

app.delete('/project/:id', deleteProject);

//TASK
app.post('/task/', addTask);

app.get('/task/', getTask);

app.put('/task/:id', editTask);
app.put('/task/check/:id', checkTask);

app.delete('/task/:id', deleteTask);

mysql.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + mysql.threadId);
});

app.listen(parseInt(process.env.PORT, 10) || 3000);

console.log('Server started!!!!');