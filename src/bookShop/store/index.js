// import @flow
import { createStore } from '../../../lib';
import { Book } from '../model';

/**
 * Here we define structure of our book list store.
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
