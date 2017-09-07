_.mixin({templateFromUrl: function (url, data, settings) {
    var templateHtml = "";
    this.cache = this.cache || {};
    
    if (this.cache[url]) {
        templateHtml = this.cache[url];
    } else {
        $.ajax({
            url: url,
            method: "GET",
            async: false,
            success: function(data) {
                templateHtml = data;
            }
        });
        
        this.cache[url] = templateHtml;
    }
    
    return _.template(templateHtml, data, settings);
}});

$.get( "/project", function( data ) {
    var template = _.templateFromUrl("/block-template.html", {projects: data});
    
    $( ".body" ).html(template({projects: data}));
});

$(document).on('click', '.add-task', function (e) {
    var idProject = $(this).attr('projectId');
    var $input = $('#' + idProject + ' input');
    var name = $input.val() || '';
    $input.val('');
    $.post( "/task", { taskName: name, projectId: idProject } ).done(function (data) {
       $('#'+idProject + ' table tbody').append('<tr id="<%= task.id %>"><th scope="row"><input type="checkbox" class="checkbox" value="" task-id="'+data.insertId+'"></th> <td class="name-task"  width="70%">'+name+'</td> <td><i task-id="'+data.insertId+'" class="fa fa-pencil editButton" aria-hidden="true"></i> | <i task-id="'+data.insertId+'" class="fa fa-trash-o deleteButton" aria-hidden="true"></i></td> </tr>')
    });
});

$(document).on('click', '.checkbox', function (e) {
    var idTask = $(this).attr('task-id');
    var checked =$(this).prop("checked");
    $.ajax({
        url: '/task/check/'+idTask,
        type: 'PUT',
        data: {
            status: checked
        }
    });
});

$(document).on('click', '.deleteButton', function (e) {
    var idTask = $(this).attr('task-id');
    var tr = $(this).parents('tr');
    $.ajax({
        url: '/task/'+idTask,
        type: 'DELETE',
        success: function () {
            $(tr).remove();
        }
    });
});

$(document).on('click', '.add-project-button', function (e) {
    var nameProject = $('.new-project-name').val() || '';
    
    $.ajax({
        url: '/project',
        type: 'POST',
        data: {projectName: nameProject},
        success: function (data) {
            var template = _.templateFromUrl("/block-template.html", {projects: [{id: data.insertId, name: nameProject, tasks: []}]});
            $( ".body" ).append(template({projects: [{id: data.insertId, name: nameProject, tasks: []}]}));
        }
    });
});

$(document).on('click', '.delete-project', function (e) {
    var idProject = $(this).attr('projectId');
    var block = $('#'+idProject);
    $.ajax({
        url: '/project/'+idProject,
        type: 'DELETE',
        success: function () {
            $(block).remove();
        }
    });
});

$(document).on('click', '.edit-project', function (e) {
    var idProject = $(this).attr('projectId');
    var block = $('#'+idProject+' .project-name');
    var name = prompt("Please enter project name", "");
    
    if (name != null && name != "") {
        $.ajax({
            url: '/project/'+idProject,
            data: { projectName : name },
            type: 'PUT',
            success: function () {
                $(block).html(name);
            }
        });
    }
});

$(document).on('click', '.edit-task-button', function (e) {
    var idTask = $(this).attr('task-id');
    var block = $('#'+idTask+' .name-task');
    var name = prompt("Please enter task name", "");
    
    if (name != null && name != "") {
        $.ajax({
            url: '/task/'+idTask,
            data: { taskName : name },
            type: 'PUT',
            success: function () {
                $(block).html(name);
            }
        });
    }
});