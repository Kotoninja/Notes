import React from 'react'
import api from '../api';
import Todo from './Todo';

export function TodoBlock({task, tasks, setTasks}) {
    function toggleTaskCompleted(id, taskCompleted) {
        api.put(`/api/note/update/${id}/`, {
            completed: !taskCompleted
        })
            .then(() => {
                const updatedTasks = tasks.map((task) => {
                    if (id === task.id) {
                        return { ...task, completed: !taskCompleted };
                    };
                    return task;
                });
                setTasks(updatedTasks);
            });
    };

    function editTask(id, newName) {
        api.put(`/api/note/update/${id}/`, { title: newName })
            .then(() => {
                const editedTaskList = tasks.map((task) => {
                    if (id === task.id) {
                        return { ...task, title: newName };
                    };
                    return task;
                });
                setTasks(editedTaskList);
            }
            );
    };

    function editDate(id, taskEndDate) {
        api.put(`/api/note/update/${id}/`, { end_date: taskEndDate })
            .then(() => {
                const editedTaskList = tasks.map((task) => {
                    if (id === task.id) {
                        return { ...task, end_date: taskEndDate };
                    };
                    return task;
                });
                setTasks(editedTaskList);
            });
    };

    function deleteTask(id) {
        api.delete(`api/note/delete/${id}/`)
            .then(
                setTasks(tasks.filter((task) => task.id != id))
            );
    };


    return (
        <Todo
            id={task.id}
            title={task.title}
            description={task.description}
            publication_date={task.publication_date}
            end_date={task.end_date}
            completed={task.completed}
            key={task.id}
            toggleTaskCompleted={toggleTaskCompleted}
            deleteTask={deleteTask}
            editTask={editTask}
            editDate={editDate}
        />
    )
};
