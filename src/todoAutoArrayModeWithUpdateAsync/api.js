/* eslint-disable no-loop-func */
// @flow
import { sendNotification } from 'micro-reducers';

// here we improvise push call from server.
// let's say
export const taskPushedFromServer = () => {
    console.log('------start push');
    const response = {
        name: 'New task from server'
    };
    let i = 1;
    for (i = 0; i < 5; i++) {
        setTimeout(() => {
            console.log('taskPushedFromServer send notification');
            sendNotification(response);
        }, i * 2000);
    }
};
