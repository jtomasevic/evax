# EVAX
Evax is library inspired by Redux, especially with concept of `actions` and `action creators`. The main difference is in reducer implementation. 

In Redux reducers are usually implemented as function receiving state and action, and returning new state. This is tipically done using switch/case when we merege action result with new state. 
> This is still and experiment. There is no still npm for Evax library. Instead for now it's in lib folder

## Response on action result

In Evax we start from assumption that most or many action result just need simple merging with state, and some of them need additonal logic. 

## Example - book store
Let's say we are building online book shop. For start we want to load list of books using some API and to show this books on the webpage. 

### Create store

For now just be aware of this code, we'll come to this in another chapter. It's using flow.js so might looks strange, but this is our recomended way for using Evax.

```javascript
// import @flow
import { createStore } from '../../../lib';
import { Book } from '../model';

/**
 * Definition of book list store.
 */
export interface BooksStore {
    /**
     * list of books loaded from server
     */
    books: Array<Book>,
    /**
     * Status of current book action. For example: loading, loaded, error.
     */
    status?: string,
    /**
     * When user is searching/filtering books here we store current filter
     */
    filter?: string
}

export type BooksHash = { [number: number]: Book };

/**
 * This is how we define sore. Funcion with initial state.
 */
const books = () => ({ books: [], status: undefined, filter: undefined }: BooksStore);

/**
 * createStore is utility function to create store, and utility function (see returning result).
 * This utility function are latter used by UI to handle store and dispatch actions.
 */
const [useBooks] = createStore(books);
export { useBooks };

```

### Create actions

Action in Evax are identical to Redux action. We would need following action:
```javascript
/**
 * Action dispatched while books are loading using api
 */
export function booksLoading() {
    return {
        type: 'booksLoading',
        status: 'booksLoading'
    };
}
/**
 * Action dipatched when books are loaded sucessfully.
 * @param {Array<Book>} books Books loaded from API
 */
export function booksLoaded(books) {
    return {
        type: 'booksLoaded',
        status: 'booksLoaded',
        books: books
    };
}
/**
 * Action dispatched when during api call someting went wrong.
 * For example server is not available, or connection is broken.
 * @param {object} error describe error
 */
export function booksLoadingError(error) {
    return {
        type: 'booksLoadingError',
        status: 'booksLoading',
        error: error
    };
}
```
### Create action creator
Next important thing we need is populary called action creator. In Redux it would be something like Thunk action. Especiall action executing asychronly and dispatching 'real' actions. Usually this kind of actions are called from UI. So our action creator in this case will look like this:

```javascript
/**
 * 'Action creator' for loading list of books. This method is executing asynchorny and dispatch diffrent
 * actions during fetching books like: started, ok, notok.
 * @param {Function} dispatch function passed via Evax library to be used to dispatch actions
 */
export function loadBooks(dispatch) {
    dispatch(booksLoading());
    getBooks().then((books) => {
        dispatch(booksLoaded(books));
    }).catch(error => {
        dispatch(booksLoadingError(error));
    });
}
```
You can notice that action creator has parameter dispatch function, which is a bit different then in Redux Thunk action. If Action creator has several parameters, last one will always be dispatch function injected by Evax library.

For example:

```javascript
export function userLogin (email, password, dispatch) {
    login(email, password).then((user: User) => {
        dispatch(userLoggedIn(user));
    });
};
```
So that's it. We didn't acctually use reducers, state from action is merged to store, and we are skipping so usuall ``` switch/case``` practice.

### Using in UI
Here is uncomplete example. We'll not handle page loading or errors, assuming that our API works fine and books will be fetched from server successfully.

```javascript
import React from 'react';
// we import previoisly created store
import { useBooks } from '../../store';
// we import previoisly created action
import { loadBooks } from '../actions';
// this is just UI element for representing book in the list.
import BookItem from './book';

const BookList = () => {
    // this is key line. here we send list of action i.e. useBooks(loadBooks, addToBasket, ..., )
    // and we get back store itself and actions (functions) that are ready to be dispatched.
    // notice that we don't have anywhere dispatch function. 
    const [store, LoadBooks] = useBooks(loadBooks);
    if (!store.status) {
        // now we just call action. 
        LoadBooks();
    }
    return (
        <div>
            <h1>Books</h1>
            <div className='books-grid-container'>
                {store.books.map((book) => (
                    <BookItem key={book.id} book={book} bookAction={() => console.log('action') } actionCaption='Add to basket' />
                ))}
            </div>
        </div>
    );
};

export default BookList;
```
NOTICE: FROM NOW ON I'm switching to function arrow style and use flow.js for static types.
Hope it's OK, and that code will be still readable if even more understandable.
## Add search

To add search option we need to add
1. Action 
```javascript
/**
 * Action to be called when user wants to search for books.
 * @param {string} filter use this value to query books
 */
export const filteringBooks = (filter: string) => ({
    type: 'filteringBooks',
    status: 'filteringBooks',
    filter
});
```
2. Action creator
```javascript
/**
 * Action creator for filtering/searching books.
 * It is using loadBooks action creator for loading books.
 */
export const filterBooks = (phrase: string, dispatch: Function) => {
    dispatch(filteringBooks(phrase));
    // we want to enable smooth filtering, without breaking while use typing key words.
    // so until user stop typing or make pause, we don' want to have non-neccessary, interupting rendering
    if (rejectFilterFetch) {
        rejectFilterFetch();
    }
    const fetchBooks: Promise<Array<Book>> = new Promise((resolve, reject) => {
        rejectFilterFetch = reject;
        getBooks(phrase).then((books: Array<Book>) => {
            resolve(books);
        });
    });
    fetchBooks.then(books => {
        dispatch(booksLoaded(books));
    });
};
```
3. Update UI
First of all we want to start using filterBooks action (creator). 
After we include it:
```javascript
import { loadBooks, filterBooks } from '../actions';
```
we can start using it after 'factoring' with useBooks hook. 
```javascript
const [store, LoadBooks, FilterBooks] = useBooks(loadBooks, filterBooks);
```
4. Finally we can add html element to call this action
```html
<input className='search-box' value={store.filter} onChange={(e) => FilterBooks(e.target.value)}></input>
```

All together it looks like this:
```javascript
import React from 'react';
import { useBooks } from '../../store';
import { loadBooks, filterBooks } from '../actions';
import BookItem from './book';

const BookList = () => {
    const [store, LoadBooks, FilterBooks] = useBooks(loadBooks, filterBooks);
    if (!store.status) {
        LoadBooks();
    }
    return (
        <div className='books-grid-container'>
            <div className='books-list-caption'>
                Books
            </div>
            <div className='book-list-search'>
                <input className='search-box' value={store.filter} onChange={(e) => FilterBooks(e.target.value)}></input>
            </div>
            <div className='book-list'>
                {store.books.map((book) => (
                    <BookItem key={book.id} book={book} bookAction={() => console.log('action') } actionCaption='Add to basket' />
                ))}
            </div>
        </div>
    );
};

export default BookList;

```
## Adding another store.

Obviously we'll need store to keep track on books that user wants to buy. Notice that in this moment user is still not logged in, we'll come to this latter. 

So let's start in same order

### Define store

We already have store named books, we need new one named shoopingBag. Here how now our store file looks:
```javascript
// import @flow
import { createStore } from '../../../lib';
import { Book } from '../model';

/**
 * Definition of book list store.
 */
export interface BooksStore {
    /**
     * list of books loaded from server
     */
    books: Array<Book>,
    /**
     * Status of current book action. For example: loading, loaded, error.
     */
    status?: string,
    /**
     * When user is searching/filtering books here we store current filter
     */
    filter?: string
}

export type BooksHash = { [number: number]: Book };

/**
 * Definition of shopping bag store.
 */
export interface ShoppingBagStore {
    /**
     * Books that user wants to buy
     */
    books: Array<Book>,
    /**
     * Total amount for paying
     */
    total: number,
    /**
     * Helper dictionary structure for adjusting prices while search, etc.
     */
    booksHash: BooksHash
}

/**
 * This is how we define sore. Funcion with initial state.
 */
const books = () => ({ books: [], status: undefined, filter: undefined }: BooksStore);
/**
 * Crerting shoopingBag store
 */
const shoopingBag = () => ({ books: [], total: 0, booksHash: {} }: ShoppingBagStore);

/**
 * createStore is utility function to create store, and utility function (see returning result).
 * This utility function are latter used by UI to handle store and dispatch actions.
 */
const [useBooks, useShoopingBag] = createStore(books, shoopingBag);
export { useBooks };
export { useShoopingBag };
```

### Create actions

```javascript
export const addToBasket = (book: Book) => ({
    type: 'addBookToBasket',
    book
});

export const removeFromBasket = (book: Book) => ({
    type: 'removeFromBasket',
    book
});
```

### We don't need action creators (for now)
Add, and remove actions are not calling web API or anything like that. They just update store locally in memory. So we can just call them from UI as we did with LoadBooks

### Implement 'Add to basket' option on book list page
Now we need something like reducers. We need to update basket list of books, but also total price, and maybe some other things, so we cannot just merge state like in previous example

### Adding reducers
Here is whole code, hoepfully understandable, (more description coming)
```javascript
/**
 * This is replacer for reducers.
 * It is not mandatory to have "reducer". If doesn't exist, action result will just merge with current store.
 */
export const basketReducers = () => {
    /**
     * User add book to shoping bag
     * @param {ShopingBagStore} store store to keep data about shoping, use can add, remove, or pay choosen books.
     * @returns {ShoppingBagStore} return updated data (store) for shoping bag.
     */
    const onAddBookToBasket = (store: ShoppingBagStore, actionResult: any): ShoppingBagStore => {
        const basketBooks: Array<Book> = store.books ? store.books : [];
        const booksHash: {} = store.booksHash ? store.booksHash : {};
        booksHash[actionResult.book.id] = actionResult.book;
        actionResult.book.inBasket = true;
        basketBooks.push(actionResult.book);
        return { ...store, books: basketBooks, booksHash };
    };

    // eslint-disable-next-line no-unused-vars
    const onAddBookToBasketAdjustPrice = (store: ShoppingBagStore, actionResult: any): ShoppingBagStore => {
        const basketBooks: Array<Book> = store.books ? store.books : [];
        let total: number = 0;
        basketBooks.forEach((book: Book) => {
            total += book.price;
        });
        return { ...store, totalPrice: total };
    };

    useReducer('addBookToBasket', onAddBookToBasket);
    useReducer('addBookToBasket', onAddBookToBasketAdjustPrice);

    const onRemoveFromBasket = (store: ShoppingBagStore, actionResult: any) => {
        actionResult.book.inBasket = false;
        const basketBooks: Array<Book> = store.books ? store.books : [];
        const booksHash: BooksHash = store.booksHash ? store.booksHash : {};
        delete booksHash[actionResult.book.id];
        for (let i = basketBooks.length - 1; i >= 0; i--) {
            if (basketBooks[i].id === actionResult.book.id) {
                basketBooks.splice(i, 1);
                break;
            }
        }
        return { ...store, books: basketBooks };
    };

    const onRemoveFromBasketAdjustPrice = (store: ShoppingBagStore, actionResult: any): ShoppingBagStore => {
        const total: number = store.totalPrice - actionResult.book.price;
        return { ...store, totalPrice: total };
    };

    useReducer('removeFromBasket', onRemoveFromBasket);
    useReducer('removeFromBasket', onRemoveFromBasketAdjustPrice);
};

export const reducers = () => {
    basketReducers();
};
```
You can notice that you can define several reducer function for one action. It gives you nice mechanizm to partially implement logic, and test it. Of course you must take care of order.

### UI
On our books page we can now start using new store and actions.
The whole new UI looks now like this:
```javascript
const BookList = () => {
    const [store, LoadBooks, FilterBooks] = useBooks(loadBooks, filterBooks);
    // WE ADD THIS and in element with class book-list you can see how we are using it.
    const [basket, AddToBasket, RemoveFromBasket] = useShoopingBag(addToBasket, removeFromBasket);
    if (!store.status) {
        LoadBooks();
    }
    return (
        <div className='books-grid-container'>
            <div className='books-list-caption'>
                Books
            </div>
            <div className='book-list-search'>
                <input className='search-box' value={store.filter} onChange={(e) => FilterBooks(e.target.value)}></input>
            </div>
            <div className='book-list-basket'>
                <div className='basket-logo'>
                    <img src={basketImg} height={50} />
                </div>
                <div className='book-list-basket-price'>
                    price: {basket.totalPrice}
                    <br/>
                    items: ({basket.books.length})
                </div>
            </div>
            <div className='book-list'>
                {store.books.map((book) => (book.inBasket === true
                    ? <BookItem key={book.id} book={book} bookAction={RemoveFromBasket} actionCaption='Remove from basket' />
                    : <BookItem key={book.id} book={book} bookAction={AddToBasket} actionCaption='Add to basket' />
                ))}
            </div>
        </div>
    );
};

export default BookList;
```

# Binding actions to UI
This is the most exciting feature of Evax. You can declerative bind action parameters with UI. We'll start with simple example. Login use case. I'll show now just changes in code to avoid too many copy/past code.
## Preparation
1. In ./bookShop/mode/index.js we are adding:
```javascript
export interface User {
    userName: string;
    email: string;
    age: number;
}
```
2. In ./booksShop/store/index.js we have following changes:
```javascript
...
import { Book, User } from '../model';
...
...
/**
 * Holding data in user session
 * For example using this store we can find out if user is signed in or not.
 */
export interface SessionStore {
    user: User;
}
...
...
/**
 * Creating session store.
 */
const session = () => ({ user: null }: SessionStore);
...
...
/**
 * createStore is utility function to create store and new utility function (see returning result).
 * This utility function are latter used by UI to handle store and dispatch actions.
 * Also last two parameters are global store and useReducer utility function.
 */
const [useBooks, useShoopingBag, useSession, store, useReducer] = createStore(books, shoopingBag, session);
...
...
export { useSession };
```
3. Add actions.
```javascript
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
    signIn(email, password).then((user: User) => {
        dispatch(userSignedIn(user));
    });
};

export const userSignUp = (email: string, password: string, age: number, source: string, gender:string, dispatch: Function) => {
    signUp(email, password, age, source, gender).then((user: User) => {
        dispatch(userSignedUp(user));
    });
};
```

Let's check now UI for login. 
```javascript
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
                    <input id='user.email' />
                </div>
                <div className='ssigin-in-user-pass-label'>
                    Password
                </div>
                <div className='sigin-in-user-pass-text'>
                    <input id='user.password' />
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
```
Pay attention one this part:
```javascript
    // remember that loging is now wrapper for UserSignIn function
    const login = bindActionProps(UserSignIn,
        'user.email', // take first parameter from element with id user.email
        'user.password'); // take second parameter from element with id user.password 
```
and latter
```javascript
...
    <input id='user.email' />
...
    <input id='user.password' />
```
and finally
```javascript
    <button onClick={login} >Login</button>
```
# More about binding action
Here we'll introduce much more complex example from previous.
- We'll need to convert value from default string to number
- We'll use select tag to choose some value, and still to be able to connect it with action parameters
- We'll use radio-button list with same challanges. 
So I suggest let's frist take a look to whole code and then we'll go step by step and explain.
```javascript
import React from 'react';
import { useSession } from '../../store/index';
import { userSignUp } from '../actions';
import history from '../../../common/history';
import { bindActionProps } from '../../../../lib/index';

// this will be our hellper structure for 'how did tou find us' which is usually get from API, but let's keep things simple for now.
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
     * 2. Then by action signature order, goes id's of controls that in some way keep value for action parameter.
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
    const options = howDidYouFinUsOptions.map((op: string) => <option key={op} value={op}>{op}</option>);
    // we need a trick for radio-button. trick is that one element can connect id and value attribute to enable bindings.
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
```

## Installation

This is more/less usual set of packages to start react application with babel, ES5 sintax, and support for flow.js. Also you'll notice there are some eslint rules too. No need to go deep into package.json (or other) files for now so just hit in terminal:

```javascript
npm install
```

## Run

Just hit 
```javascript
npm run start
```
and go to:  ```http://localhost:7000/```