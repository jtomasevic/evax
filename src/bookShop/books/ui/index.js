import React from 'react';
import { useBooks, useShoopingBag } from '../../store';
import { loadBooks, filterBooks } from '../actions';
import { addToBasket, removeFromBasket } from '../../basket/actions';
import { basketImg } from '../../../images';
import BookItem from './book';

const BookList = () => {
    const [store, LoadBooks, FilterBooks] = useBooks(loadBooks, filterBooks);
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
                <img src={basketImg} />
                <p>
                    {basket.totalPrice}
                </p>
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
