export const addTask = (newTaskName) => {
    const result = { type: 'addTask', newTaskName };
    return result;
};

export const completeTask = (task) => ({ type: 'completeTask', task });

export const deleteTask = (task) => ({ type: 'deleteTask', task });

export const taskStatus = [
    'active',
    'completed'
];
