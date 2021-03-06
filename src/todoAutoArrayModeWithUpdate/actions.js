export const addTask = (newTaskName) => {
    const result = { type: 'addTask', newTaskName };
    return result;
};

export const completeTask = (task) => ({ type: 'completeTask', task });

export const deleteTask = (task) => ({ type: 'deleteTask', task });

export const filterTasks = (status) => ({ type: 'filterTasks', status });

// by convention cancel filter function is always of type !cancelFilter
export const cancelFilter = (collectionName) => ({ type: '!cancelFilter', collectionName });

export const taskStatus = [
    'active',
    'completed'
];
