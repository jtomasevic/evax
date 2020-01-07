import React from 'react';
import { createStore } from '../../lib';

// define store
const messages = () => ({ message: undefined });
// create store
const [useMessages] = createStore(messages);
// create action
const getMesssage = (message) => ({
    type: 'messageReceived',
    message
});
// create ui element
const HelloWorld = () => {
    const [store, GetMesssage] = useMessages(getMesssage);
    if (!store.message) {
        // call action directly, no wrapping etc.
        GetMesssage('somebody');
    }
    console.log('render', store);
    return (
        <div>
            {store.message}
        </div>
    );
};
export default HelloWorld;
