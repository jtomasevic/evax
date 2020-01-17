/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { bindActionProps, forArrPush, forArrRemove } from 'micro-reducers';
import { useTodoList } from './store';
import { addTask, completeTask } from './actions';

const Task = ({ task, onComplete }) => (
    <li>
        {task.name}
        <br/>
        <button onClick={(e) => { e.stopPropagation(); onComplete(task); }}> Complete </button>
    </li>
);

const todoList = () => {
    const addParamsToObj = (taskName) => ({ name: taskName });
    const removeParamsToObj = (task) => (task);
    const [store, AddTask, CompleteTask] = useTodoList(
        forArrPush('tasks', addTask, addParamsToObj),
        forArrRemove('tasks', completeTask, removeParamsToObj)
    );
    const tasks = store.tasks.map((task) => <Task key={task._key} task={task} onComplete={CompleteTask} />);
    const add = bindActionProps(AddTask, 'task.name');
    const onAdd = (e) => {
        e.stopPropagation();
        add();
        document.getElementById('task.name').value = '';
    };
    return (
        <>
            <div>
                    Task list
                <ul>
                    {tasks}
                </ul>
            </div>
            <div>
                <input type='text' id='task.name' />
            </div>
            <div>
                <button onClick={onAdd}>Add</button>
            </div>
        </>
    );
};

export default todoList;
