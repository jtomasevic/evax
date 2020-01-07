import React from 'react';
import { createStore, bindActionProps } from '../../lib';

// define store
const lottery = () => ({ userName: undefined, lotteryTicketNo: 0, messageForUser: '' });
// create store
const [useLottery] = createStore(lottery);
// create action
const lotterySubmit = (userName, lotteryTicketNo) => {
    console.log(`user submit lottery number ${lotteryTicketNo}, for this example this will be sync function.`);
    return {
        type: 'lotterySubmit',
        messageForUser: `Dear ${userName} you won 1000$!`
    };
};
// create ui element
const HelloWorld = () => {
    const [store, LotterySubmit] = useLottery(lotterySubmit);
    // bind action arguments in the same order as action signature.
    // in this case lotterSubmit has arguments (userName, lotteryTicketNo) see above.
    // bindActionProps will create function ready to pick up values from ui and to invoke action, so it's easy to bind to UI.
    const submit = bindActionProps(LotterySubmit,
        'user.userName',
        'user.lotteryNo');
    return (
        <>
            <h3>Hello world example for action bindings (sync)</h3>
            <div>
                User name: <input type='text' id='user.userName' />
            </div>
            <div>
                Lottery No <input type='text' id='user.lotteryNo' />
            </div>
            <div>
                <button onClick={submit}>Submit</button>
            </div>
            <p>
                {store.messageForUser}
            </p>
        </>
    );
};
export default HelloWorld;
