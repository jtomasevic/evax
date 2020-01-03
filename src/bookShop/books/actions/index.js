import { Book } from '../../model';
import { getBooks } from '../api';

/**
 * Action dispatched while books are loading using api
 */
export const booksLoading = () => ({
    type: 'booksLoading',
    status: 'booksLoading'
});
/**
 * Action dipatched when books are loaded sucessfully.
 * @param {Array<Book>} books Books loaded from API
 */
export const booksLoaded = (books: Array<Book>) => ({
    type: 'booksLoaded',
    status: 'booksLoaded',
    books
});
/**
 * Action dispatched when during api call someting went wrong.
 * For example server is not available, or connection is broken.
 * @param {object} error describe error
 */
export const booksLoadingError = (error) => ({
    type: 'booksLoadingError',
    status: 'booksLoading',
    error
});

/**
 * 'Action creator' for loading list of books. This method is executing asynchorny and dispatch diffrent
 * actions during fetching books like: started, ok, notok.
 * @param {Function} dispatch function passed via Evax library to be used to dispatch actions
 */
export const loadBooks = (dispatch: Function) => {
    dispatch(booksLoading());
    getBooks().then((books: Array<Book>) => {
        dispatch(booksLoaded(books));
    }).catch(error => {
        dispatch(booksLoadingError(error));
    });
};
