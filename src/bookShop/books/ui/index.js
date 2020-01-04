import React from 'react';
import { useBooks } from '../../store';
import { loadBooks, filterBooks } from '../actions';
import { basketImg } from '../../../images';
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
            <div className='book-list-basket'>
                <img src={basketImg} />
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
