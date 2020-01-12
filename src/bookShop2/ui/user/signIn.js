/* eslint-disable radix */
import React from 'react';
import { bindActionProps } from 'micro-reducers';
import { useSession } from '../../../bookShop/store';
import { userSignIn } from '../../../bookShop/user/actions';
import history from '../../../common/history';


class Login extends React.Component {
    constructor(state, context) {
        super(state, context);
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // Very important:
        // you need to define proper state, with proper properties.
        this.state = {
            session: {
                user: null
            }
        };
        // this are key changes.................. sending this in array (don't forget!) as first parameter
        const [UserSignIn] = useSession([this], userSignIn);
        // now bind actions.
        this.UserSignIn = UserSignIn;
        this.login = bindActionProps(this.UserSignIn,
            'user.email',
            'user.password');
    }

    componentDidMount() {

    }

    // eslint-disable-next-line no-unused-vars
    static getDerivedStateFromProps(nextProps, state) {
        console.log('----', nextProps, state);
        if (state.session.user) {
            history.push('/');
        }
    }

    render() {
        return (
            <>
            <h1>Login (class)</h1>
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
                    <a href='#' className='standard-button' onClick={this.login} >Login</a>
                </div>
                <div className='sigin-up-button'>
                    <a href='#' className='standard-button' onClick={() => history.push('/signup')} >Register</a>
                </div>
            </div>
        </>
        );
    }
}

export default Login;
