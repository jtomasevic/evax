import { useReducer } from './store';

/**
 * This is replacer for reducers.
 * It is not mandatory to have "reducer". If doesn't exist, action result will just merge with current store.
 */
export const todoListReducers = () => {
    const fixTaskIndexes = (tasks) => (tasks.map((task, index) => ({ ...task, index })));

    const onAddTask = (store, actionResult) => {
        let tasks = store.tasks;
        tasks.push({ name: actionResult.newTaskName, newTaskName: '' });
        // add index, to latter make easy complete or remove action
        tasks = fixTaskIndexes(tasks);
        return { ...store, tasks };
    };

    const onCompleteTask = (store, actionResult) => {
        console.log(actionResult.task);
        let tasks = store.tasks;
        tasks.splice(actionResult.task.index, 1);
        // add index, to latter make easy complete or remove action
        tasks = fixTaskIndexes(tasks);
        return { ...store, tasks };
    };

    useReducer('addTask', onAddTask);
    useReducer('completeTask', onCompleteTask);
};

export const reducers = () => {
    todoListReducers();
};
