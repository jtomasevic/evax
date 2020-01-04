# EVAX
Evax is library inspired by Redux, especially with concept of `actions` and `action creators`. The main difference is in reducer implementation. 

In Redux reducers are usually implemented as function receiving state and action, and returning new state. This is tipically done using switch/case when we merege action result with new state. 

## Response on action result

In Evax we start from assumption that most or many action result just need simple merging with state, and some of them need additonal logic. 

## Example - book store
Let's say we are building online book shop. For start we want to load list of books using some API and to show this books on the webpage. 

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

## Binding actions to UI

## Installation

This is more/less usual set of packages to start react application with babel, ES5 sintax, and support for flow.js. Also you'll notice there are some eslint rules too. No need to go deep into package.json (or other) files for now so just hit in terminal:

```javascript
npm install
```

## Run

Just hit 
```javascript
npm install
```
and go to:  ```http://localhost:7000/```