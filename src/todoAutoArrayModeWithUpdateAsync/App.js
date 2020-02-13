import React from 'react';
import './style.css';
import TodoList from './ui';
import { taskPushedFromServer } from './api';

taskPushedFromServer();

export default function App() {
    return <TodoList />;
}
