/* eslint-disable radix */
import React from 'react';
import { useSession } from '../../store';
import { userSignIn } from '../actions';
import history from '../../../common/history';
import { bindActionProps } from '../../../../lib';
import './style.css';

const Login = () => {
    const [store, UserSignIn] = useSession(userSignIn);
    if (store.user) {
        history.push('/');
    }

    const login = bindActionProps(UserSignIn,
        'user.email',
        'user.password');

    return (
        <>
            <h1>Login</h1>
            <div className='sigin-in-grid-container'>
                <div className='user-name-label'>
                    Email
                </div>
                <div className='user-name-text'>
                    <input type='text' id='user.email' />
                </div>
                <div className='user-pass-label'>
                    Password
                </div>
                <div className='user-pass-text'>
                    <input type='text' id='user.password' />
                </div>
                <div className='sigin-in-button'>
                    <button onClick={login} >Login</button>
                </div>
                <div className='sigin-up-button'>
                    <button onClick={() => history.push('/signup')} >Register</button>
                </div>
            </div>
        </>
    );
};

export default Login;
