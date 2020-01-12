import React from 'react';
import { createStore, bindActionProps } from 'micro-reducers';

// define store
const lottery = () => ({ userName: undefined, lotteryTicketNo: 0, messageForUser: '' });
// create store
const [useLottery] = createStore(lottery);
// create action
const lotteryResult = (won, amount, messageForUser) => {
    console.log(`user result: ${won}, and amount: ${amount}`);
    return {
        type: 'lotteryResult',
        won,
        amount,
        messageForUser
    };
};
// create action creator
const lotterySubmit = (userName, lotteryTicketNo, dispatch) => {
    // imitate server call with timout function
    console.log(`calling async method and send ${userName} and ${lotteryTicketNo} to some API`);
    setTimeout(() => {
        // so let's pretend that variables won and amount are result from API code.
        const won = !(Math.floor(Math.random() * 2) > 0);
        const getRndAmount = (min, max) => Math.floor(Math.random() * (max - min)) + min;
        let amount = 0;
        if (won !== 0) {
            amount = getRndAmount(1000, 300000);
        }
        const message = won ? `Bravo! You just won $ ${amount}!` : 'Sorry try next time';
        // now call action (notice it's async)
        dispatch(lotteryResult(won, amount, message));
    }, 200);
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
