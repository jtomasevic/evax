// @flow
import { User } from '../../model';
// eslint-disable-next-line no-unused-vars
export const signIn = (email: string, password: string): Promise<User> => new Promise<User>(resolve => {
    const user: User = {
        email: 'jtomasevic@gmail.com',
        userName: 'Alehijan'
    };
    setTimeout(() => {
        resolve(user);
    }, 500);
});

// eslint-disable-next-line no-unused-vars
export const signUp = (email: string, password: string, age: number, source: string, gender: string): Promise<User> => new Promise<User>(resolve => {
    const user: User = {
        email: 'jtomasevic@gmail.com',
        userName: 'Alehijan',
        age: 40,
        source,
        gender
    };
    setTimeout(() => {
        resolve(user);
    }, 500);
});
