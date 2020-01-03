import React from 'react';
import { useBooks } from '../../store';
import { loadBooks } from '../actions';
import BookItem from './book';

const BookList = () => {
    const [store, LoadBooks] = useBooks(loadBooks);
    if (!store.status) {
        LoadBooks();
    }
    return (
        <div>
            <h1>Books</h1>
            <div className='books-grid-container'>
                {store.books.map((book) => (
                    <BookItem key={book.id} book={book} bookAction={() => console.log('action') } actionCaption='Add to basket' />
                ))}
            </div>
        </div>
    );
};

export default BookList;
