import React from 'react';
import { Todo } from '@/entities/note/ui/Todo';
import { noteUpdate, noteDelete } from "@/entities/note/api";

export function TodoBlock({ props }) {
    function deleteTask(id) {
        try {
            noteDelete(id)
            props.setTasks(props.tasks.filter((task) => task.id != id))
        } catch (error) {
            console.error(error);
        }
    };

    function toggleTaskCompleted(id, taskCompleted) {
        try {
            noteUpdate(id, { completed: !taskCompleted })
            const updatedTasks = props.tasks.map((task) => {
                if (id === task.id) {
                    return { ...task, completed: !taskCompleted };
                };
                return task;
            });
            props.setTasks(updatedTasks);
        } catch (error) {
            console.error(error);
        }
    };
 
    function editTask(id, newName) {
        try {
            noteUpdate(id, { title: newName })
            const editedTaskList = props.tasks.map((task) => {
                if (id === task.id) {
                    return { ...task, title: newName };
                };
                return task;
            });
            props.setTasks(editedTaskList);
        } catch (error) {
            console.error(error);
        }
    };

    function editDate(id, taskTitle, taskEndDate) {
        try {
            noteUpdate(id, { end_date: taskEndDate })
            const editedTaskList = props.tasks.map((task) => {
                if (id === task.id) {
                    return { ...task, end_date: taskEndDate };
                };
                return task;
            });
            props.setTasks(editedTaskList);
        } catch (error) {
            console.error(error)
        }
    };
    return (
        <Todo
            id={props.id}
            title={props.title}
            description={props.description}
            publication_date={props.publication_date}
            end_date={props.end_date}
            completed={props.completed}
            key={props.id}
            toggleTaskCompleted={toggleTaskCompleted}
            deleteTask={deleteTask}
            editTask={editTask}
            editDate={editDate}
        />
    );
};
