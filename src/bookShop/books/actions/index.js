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
 * Action to be called when user wants to search for books.
 * @param {string} filter use this value to query books
 */
export const filteringBooks = (filter: string) => ({
    type: 'filteringBooks',
    status: 'filteringBooks',
    filter
});

/**
 * Action creator for loading list of books. This method is executing asynchorny and dispatch diffrent
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

let rejectFilterFetch = null;
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
    const fetchBooks: Promise<Array<Book>> = new Promise<Array<Book>>((resolve, reject) => {
        rejectFilterFetch = reject;
        getBooks(phrase).then((books: Array<Book>) => {
            resolve(books);
        });
    });
    fetchBooks.then(books => {
        dispatch(booksLoaded(books));
    });
};
