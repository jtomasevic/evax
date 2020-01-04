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
const shoopingBag = () => ({ books: [], totalPrice: 0, booksHash: {} }: ShoppingBagStore);

/**
 * createStore is utility function to create store, and utility function (see returning result).
 * This utility function are latter used by UI to handle store and dispatch actions.
 */
const [useBooks, useShoopingBag, attachToAction, store] = createStore(books, shoopingBag);
export { useBooks };
export { useShoopingBag };
export { attachToAction };
export { store };
