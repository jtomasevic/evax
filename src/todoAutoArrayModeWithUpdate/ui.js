/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import './style.css';
import { bindActionProps, forArrPush, forArrRemove, forUpdateArray } from 'micro-reducers';
import { useTodoList } from './store';
import { addTask, completeTask, deleteTask, taskStatus } from './actions';

const Task = ({ task, onComplete, onDelete }) => (
    <>
        <div className={`tname ${task.status}`}>
            {task.name}
        </div>
        <div className ='tompl'>
            <button className='todo-button' onClick={(e) => { e.stopPropagation(); onComplete(task); }}> Complete </button>
        </div>
        <div className ='tremv'>
            <button className='todo-button' onClick={(e) => { e.stopPropagation(); onDelete(task); }}> Delete </button>
        </div>
    </>
);

const TodoList = () => {
    const addParamsToObj = (taskName) => ({ name: taskName, status: 'active' });
    const removeParamsToObj = (task) => (task);
    const completeParamsToObj = (task) => ({ ...task, status: 'completed' });
    const [store, AddTask, CompleteTask, DeleteTask] = useTodoList(
        forArrPush('tasks', addTask, addParamsToObj),
        forUpdateArray('tasks', completeTask, completeParamsToObj),
        forArrRemove('tasks', deleteTask, removeParamsToObj)
    );
    const tasks = store.tasks.map((task) => <Task key={task._key} task={task} onComplete={CompleteTask} onDelete={DeleteTask} />);
    const add = bindActionProps(AddTask, 'task.name');
    const onAdd = (e) => {
        e.stopPropagation();
        add();
        document.getElementById('task.name').value = '';
    };
    const filterOptions = taskStatus.map((op: string) => <option key={op} value={op}>{op}</option>);

    const onStatusFilterChange = (e) => {
        e.stopPropagation();
        console.log(e.target.value);
    };
    return (
        <>
            <h1>Task list</h1>
            <div className='todo-grid'>
                <div className='tname'>
                    <input type='text' id='task.name' />
                </div>
                <div className='tadd'>
                    <button className='todo-button' onClick={onAdd}>Add</button>
                </div>
            </div>
            <br/>
            <div className='tasks-grid'>
                {tasks}
                <div className='tasks-filter'>
                    <select id='user.source' onChange={onStatusFilterChange}>
                        <option >Filter by status</option>
                        {filterOptions}
                    </select>
                </div>
            </div>

        </>
    );
};

export default TodoList;
