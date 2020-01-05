// import @flow
import { createStore } from '../../../lib';
import { Book, User } from '../model';

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
 * Holding data in user session
 * For example using this store we can find out if user is signed in or not.
 */
export interface SessionStore {
    user: User;
}

/**
 * This is how we define sore. Funcion with initial state.
 */
const books = () => ({ books: [], status: undefined, filter: undefined }: BooksStore);
/**
 * Creating shoopingBag store
 */
const shoopingBag = () => ({ books: [], totalPrice: 0, booksHash: {} }: ShoppingBagStore);
/**
 * Creating session store.
 */
const session = () => ({ user: null }: SessionStore);

/**
 * createStore is utility function to create store and new utility function (see returning result).
 * This utility function are latter used by UI to handle store and dispatch actions.
 * Also last two parameters are global store and useReducer utility function.
 */
const [useBooks, useShoopingBag, useSession, store, useReducer] = createStore(books, shoopingBag, session);

export { useBooks };
export { useShoopingBag };
export { useSession };
export { store };
export { useReducer };
