/* eslint-disable radix */
import React from 'react';
import { useSession } from '../../store/index';
import { userSignUp } from '../actions';
import history from '../../../common/history';
import { bindActionProps } from '../../../../lib/index';

const howDidYouFinUsOptions = [
    'Recomendation',
    'Googling about bookd',
    'Facebook',
    'Instagram'
];

const genders = [
    'Male',
    'Female'
];

const SignUp = () => {
    const [store, UserSignup] = useSession(userSignUp);
    if (store.user) {
        history.push('/basket');
    }
    const signUp = bindActionProps(UserSignup,
        'user.email',
        'user.password',
        'user.userName',
        ['user.age', (element: HTMLElement) => parseInt(element.value)],
        'user.source',
        'user.gender');
        // ['user.source', (element: HTMLElement) => element.value]);

    const options = howDidYouFinUsOptions.map((op: string) => <option key={op} value={op}>{op}</option>);
    const onGenderChange = (e) => (document.getElementById('user.gender').setAttribute('value', e.target.value));
    const genderOptions = genders.map((gender: string) => <span key={gender}>
        <label>{gender}</label>
        <input type='radio' name='gender' value={gender} onChange={onGenderChange}/>
    </span>);

    console.log(options);
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
