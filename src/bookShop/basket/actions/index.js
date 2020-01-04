import { Book } from '../../model';

export const addToBasket = (book: Book) => ({
    type: 'addBookToBasket',
    book
});

export const removeFromBasket = (book: Book) => ({
    type: 'removeFromBasket',
    book
});
