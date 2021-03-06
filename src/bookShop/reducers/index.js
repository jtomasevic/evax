import { BasketStore, BooksHash, useReducer } from '../store';
import { Book } from '../model';

/**
 * This is replacer for reducers.
 * It is not mandatory to have "reducer". If doesn't exist, action result will just merge with current store.
 */
export const basketReducers = () => {
    /**
     * User add book to shoping bag
     * @param {ShopingBagStore} store store to keep data about shoping, use can add, remove, or pay choosen books.
     * @param {AddToBasketResult} actionResult action result happened after user chooses book to buy (add to basket).
     * @returns {BasketStore} return updated data (store) for shoping bag.
     */
    const onAddBookToBasket = (store: BasketStore, actionResult: any): BasketStore => {
        const basketBooks: Array<Book> = store.books ? store.books : [];
        const booksHash: {} = store.booksHash ? store.booksHash : {};
        booksHash[actionResult.book.id] = actionResult.book;
        actionResult.book.inBasket = true;
        basketBooks.push(actionResult.book);
        return { ...store, books: basketBooks, booksHash };
    };

    // eslint-disable-next-line no-unused-vars
    const onAddBookToBasketAdjustPrice = (store: BasketStore, actionResult: any): BasketStore => {
        const basketBooks: Array<Book> = store.books ? store.books : [];
        let total: number = 0;
        basketBooks.forEach((book: Book) => {
            total += book.price;
        });
        return { ...store, totalPrice: total };
    };

    useReducer('addBookToBasket', onAddBookToBasket);
    useReducer('addBookToBasket', onAddBookToBasketAdjustPrice);

    const onRemoveFromBasket = (store: BasketStore, actionResult: any) => {
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

    // eslint-disable-next-line no-unused-vars
    const onRemoveFromBasketAdjustPrice = (store: BasketStore, actionResult: any): BasketStore => {
        const total: number = store.totalPrice - actionResult.book.price;
        return { ...store, totalPrice: total };
    };

    useReducer('removeFromBasket', onRemoveFromBasket);
    useReducer('removeFromBasket', onRemoveFromBasketAdjustPrice);
};

export const reducers = () => {
    basketReducers();
};
