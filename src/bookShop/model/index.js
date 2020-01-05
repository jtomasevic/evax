// @flow

export interface Book {
    id: string,
    title: string,
    subtitle: string,
    publisher: string,
    images?: {
        small?: string,
        big?: string
    },
    language: string,
    authors: [],
    description: string,
    price: number
}

export interface User {
    userName: string;
    email: string;
    age: number;
}
