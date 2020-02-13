import React from 'react';

export const App = () => (
    <div>
        <h1>Examples</h1>
        <ul>
            <h3>Book shop examples</h3>
            <li> <a href="/books">Book shop</a> </li>
            <li> <a href="/books2">Book shop (implementation with class component - not still full finished</a> </li>
            <li> <a href="/signin">Sign in</a> </li>
            <li> <a href="/signup">Sign up</a> </li>
        </ul>
        <ul>
            <h3>Hello world examples</h3>
            <li> <a href="/hello">Hello world with sync actions</a> </li>
            <li> <a href="/hello2">Hello world with async actions</a> </li>
            <li> <a href="/hello3">Hello world with sync actions Hello world with async actions and action params binding</a> </li>
            <li> <a href="/hello4">Hello world with async actions and action params binding</a> </li>
        </ul>
        <ul>
            <h3>Todo examples</h3>
            <li>
                <a href="/todo">Very simple todo (using reducers)</a>
            </li>
            <li>
                <a href="/todo2">Very simple todo (no reducers)</a>
            </li>
            <li>
                <a href="/todo3">Todo with filtering</a>
            </li>
            <li>
                <a href="/todo4">Todo with filtering and notifications (all async).</a>
            </li>
        </ul>
    </div>
);
