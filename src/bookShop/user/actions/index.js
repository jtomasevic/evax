import { User } from '../../model';
import { signUp, signIn } from '../api';

export const userSignedIn = (user: User) => ({
    type: 'userSignedIn',
    user
});

export const userSignedUp = (user: User) => ({
    type: 'userSignedUp',
    user
});

export const userSignIn = (email: string, password: string, dispatch: Function) => {
    console.log('****** userLogin', { email, password });
    signIn(email, password).then((user: User) => {
        dispatch(userSignedIn(user));
    });
};

export const userSignUp = (email: string, password: string, age: number, source: string, gender:string, dispatch: Function) => {
    console.log('****** userSignup', { email, password, age, source, gender });
    signUp(email, password, age, source, gender).then((user: User) => {
        dispatch(userSignedUp(user));
    });
};
