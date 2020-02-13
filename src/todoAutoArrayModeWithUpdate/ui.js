/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import './style.css';
import { bindActionProps, forArrPush, forArrRemove, forUpdateArray, forFilterArray, forArrPushAsync } from 'micro-reducers';
import { useTodoList } from './store';
import { addTask, completeTask, deleteTask, filterTasks, taskStatus, cancelFilter } from './actions';
import { addTaskAsync } from '../todoAutoArrayModeWithUpdateAsync/actions';

const Task = ({ task, onComplete, onDelete }) => (
    <>
        <div className={`tname ${task.status}`}>
            {task.name}
        </div>
        <div className ='tompl'>
            <button className='todo-button' disabled={ task.status === 'completed'} onClick={(e) => { e.stopPropagation(); onComplete(task); }}> Complete </button>
        </div>
        <div className ='tremv'>
            <button className='todo-button' onClick={(e) => { e.stopPropagation(); onDelete(task); }}> Delete </button>
        </div>
    </>
);

const TodoList = () => {
    const [store, AddTask, CompleteTask, DeleteTask, FilterTasks, CancelFilter] = useTodoList(
        // This means: let my addTask action become push operation under 'tasks' array
        // Last attribute is function that transforme action parameters into object to
        // be added to arry. In this case we know that addTask method has one parameter
        // which is task name.
        forArrPushAsync('tasks', addTaskAsync, (taskName) => ({ name: taskName, status: 'active' })),
        // This means: let my completeTask become 'update array member' operation under
        // task array. Last attribute is function that is returning new object state
        // Remember, each object has key, so that's how library will find original and update.
        forUpdateArray('tasks', completeTask, (task) => ({ ...task, status: 'completed' })),
        // This means: let my deleteTask action become delete operation under 'tasks' array
        // Last attribute is function that is returning object that should be deleted
        forArrRemove('tasks', deleteTask, (task) => (task)),
        // This means: I want to use filtering under tasks array with filterTasks action
        // Last attribute is function with two parameters:
        //  1. original array
        //  2. attributes from dispatched action.
        forFilterArray('tasks', filterTasks, (arr, params) => (arr.filter(t => t.status === params.status))),
        // This just simply means I want to wrap cancelFilter function to be used in UI.
        // Nothing especiall, BUT this action returns
        // { type: '!cancelFilter', collectionName: 'tasks' } which by convention means reset filer on array tasks
        cancelFilter
    );
    // Here we said: first parameter of AddTask (originally addTask) action
    // Will be picked up from ui element with id 'task.name'.
    // In this case this is input text field.
    // Latter we can just call add() add binding will do the rest.
    // NOTR: For more complex binding see example on: https://github.com/jtomasevic/evax
    //      (example after app installed: http://localhost:7000/signUp)
    //      source in wiki: https://github.com/jtomasevic/evax/wiki/8.-Very-complex-binding
    const add = bindActionProps(AddTask, 'task.name');
    // Same for filter for task statuses, but this time we have select element.
    const filter = bindActionProps(FilterTasks, 'tasks.filterStatus');
    // On add we want to clean text field for new text, and that's reason we have this
    // function here. Otherewise we'll just simple call <button onClick={add} ...
    const onAdd = (e) => {
        e.stopPropagation();
        add();
        document.getElementById('task.name').value = '';
    };
    /**
     * User can coose some value from list,
     * but also user can choose to cancel filter.
     * Because of that we put first element in list with value='cancelStatusFilter'.
     * You'll see bellow in ui
     * ....
     * <option value='cancelStatusFilter'>Filter by status</option>
     * ....
     * When use chose this first option we want to show all task, in other words to cancel filter.
     * @param {event} e react event
     */
    const onFilterChange = (e) => {
        if (e.target.value === 'cancelStatusFilter') {
            CancelFilter('tasks');
        } else {
            filter();
            console.log('---------sadf---');
        }
    };
    // Generating select options for task status filter
    const filterOptions = taskStatus.map((op: string) => <option key={op} value={op} >{op}</option>);
    // Because we are using filtering, by default library generate store property <...>WithFilter
    // That's why we have this here. While filtering is on we'll bind filtered list, otherwise original one.
    let tasks = store.tasksWithFilter ? store.tasksWithFilter : store.tasks;
    tasks = tasks.map((task) => <Task key={task._key} task={task} onComplete={CompleteTask} onDelete={DeleteTask} />);
    console.log('RENDER store.tasks2', store);
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
                    <select id='tasks.filterStatus' onChange={onFilterChange}>
                        <option value='cancelStatusFilter'>Filter by status</option>
                        {filterOptions}
                    </select>
                </div>
            </div>
        </>
    );
};

export default TodoList;
