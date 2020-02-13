export const addTask = (newTaskName) => {
    const result = { type: 'addTask', newTaskName };
    return result;
};
export const addTaskAsync = (newTaskName, dispatch) => {
    setTimeout(() => {
        dispatch(addTask(newTaskName));
    }, 1000);
};
export const completeTask = (task) => ({ type: 'completeTask', task });

export const completeTaskAsync = (task, dispatch) => {
    setTimeout(() => {
        dispatch(completeTask(task));
    }, 700);
};

export const deleteTask = (task) => ({ type: 'deleteTask', task });

export const deleteTaskAsync = (task, dispatch) => {
    setTimeout(() => {
        dispatch(deleteTask(task));
    }, 500);
};

export const filterTasks = (status) => ({ type: 'filterTasks', status });

export const filterTasksAsync = (task, dispatch) => {
    setTimeout(() => {
        dispatch(filterTasks(task));
    }, 500);
};

// by convention cancel filter function is always of type !cancelFilter
export const cancelFilter = (collectionName) => ({ type: '!cancelFilter', collectionName });

export const taskStatus = [
    'active',
    'completed'
];

export const taskPushed = (task) => ({ type: 'taskPushed', task });
