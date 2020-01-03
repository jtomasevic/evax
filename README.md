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