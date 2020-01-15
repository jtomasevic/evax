import { createStore } from 'micro-reducers';

/**
 * This is how we define sore. Funcion with initial state.
 */
const todoList = () => ({ tasks: [], newTaskName: '' });

/**
 * createStore is utility function to create store and new utility function (see returning result).
 * This utility function are latter used by UI to handle store and dispatch actions.
 * Also last two parameters are global store and useReducer utility function.
 */
const [useTodoList, store, useReducer] = createStore(todoList);

export { useTodoList, store, useReducer };
