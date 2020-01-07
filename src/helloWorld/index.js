import React from 'react';
import { createStore } from '../../lib';

// define store
const messages = () => ({ message: undefined });

// create store
const [useMessages] = createStore(messages);

// create action
const messageReceived = (message) => ({
    type: 'messageReceived',
    message
});

// create action creator (async action)
const messageRequest = (name, dispatch) => {
    setTimeout(() => {
        dispatch(messageReceived(`Hello world to ${name}`));
    }, 1000);
};

// create ui element
export const HelloWorld = () => {
    const [store, MessageRequest] = useMessages(messageRequest);
    if (!store.message) {
        // call action directly, no wrapping etc.
        MessageRequest('somebody');
    }
    return (
        <div>
            {store.message}
        </div>
    );
};
