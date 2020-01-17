export const addTask = (newTaskName) => {
    const result = { type: 'addTask', newTaskName };
    return result;
};

export const completeTask = (task) => {
    const result = { type: 'completeTask', task };
    return result;
};
