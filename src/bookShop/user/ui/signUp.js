/* eslint-disable radix */
import React from 'react';
import { bindActionProps } from 'micro-reducers';
import { useSession } from '../../store';
import { userSignUp } from '../actions';
import history from '../../../common/history';


// this will be our hellper structure for 'how did tou find us' which is usually get from API
// but let's keep things simple for now.
const howDidYouFinUsOptions = [
    'Recomendation',
    'Googling about bookd',
    'Facebook',
    'Instagram'
];

// more/less like howDidYouFinUsOptions, also it could be object like: {genter:'Male, id:1}, etc...
const genders = [
    'Male',
    'Female'
];

const SignUp = () => {
    const [store, UserSignup] = useSession(userSignUp);
    if (store.user) {
        history.push('/basket');
    }
    /**
     * Binding works in this way.
     * 1. First parameter is Action.
     * 2. Then by action signature order, goes id's of controls that in some way keep value
     *    for action parameter.
     * In given example UserSignup is wrapper for action that has following signature:
     *  userSignUp = (email: string,
     *                password: string,
     *                userName: string,
     *                age: number,
     *                source: string,
     *                gender:string)
     * It is very important to NOTICE that bidings are in the sam order as parameters.
     * Look next statement just bellow this comment and compare with action declaration.
     */
    const signUp = bindActionProps(UserSignup,
        'user.email',
        'user.password',
        'user.userName',
        ['user.age', (element: HTMLElement) => parseInt(element.value)],
        'user.source',
        'user.gender');
    // generating select option.
    const options = howDidYouFinUsOptions.map((o: string) => <option key={o} value={o}>{o}</option>);
    // we need a trick for radio-button. trick is that one element can connect id and value
    // attribute to enable bindings.
    // try to figure out next few lines (more explanation coming).
    const onGenderChange = (e) => (document.getElementById('user.gender').setAttribute('value', e.target.value));
    const genderOptions = genders.map((gender: string) => <span key={gender}>
        <label>{gender}</label>
        <input type='radio' name='gender' value={gender} onChange={onGenderChange}/>
    </span>);

    return (
        <>
            <h1>Sign up now!</h1>
            <div className='sigin-up-grid-container'>
                <div className='user-email-label'>
                    <span className='asterix'>*</span> Email
                </div>
                <div className='user-email-text'>
                    <input type='text' id='user.email' />
                </div>
                <div className='user-pass-label'>
                    <span className='asterix'>*</span> Password
                </div>
                <div className='user-pass-text'>
                    <input type='text' id='user.password' />
                </div>
                <div className='user-name-label'>
                    Desired user name
                </div>
                <div className='user-name-text'>
                    <input type='text' id='user.userName' />
                </div>
                <div className='user-age'>
                    Please enter your age
                </div>
                <div className='user-age'>
                    <input type='text' id='user.age' />
                </div>
                <div className='source-list'>
                    <select id='user.source'>
                        <option>How did you hear about us?</option>
                        {options}
                    </select>
                </div>
                <div className='user-gender-title' id='user.gender'>
                    Gender
                </div>
                <div className='user-gender-list'>
                    {genderOptions}
                </div>
                <div className='register-btn'>
                    <a href="#" className='standard-button' onClick={signUp}>Sign Up</a>
                </div>
            </div>
        </>);
};

export default SignUp;
