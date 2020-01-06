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
                <div className='sigin-in-user-name-label'>
                    User name
                </div>
                <div className='sigin-in-user-name-text'>
                    <input title='User name' id='user.email' />
                </div>
                <div className='ssigin-in-user-pass-label'>
                    Password
                </div>
                <div className='sigin-in-user-pass-text'>
                    <input title='User name' id='user.password' />
                </div>
                <div className='sigin-in-user-button'>
                    <button onClick={login} >Login</button>
                </div>
                <div className='sigin-up-user-button'>
                    <button onClick={() => history.push('/signup')} >Register</button>
                </div>
            </div>
        </>
    );
};

export default Login;
