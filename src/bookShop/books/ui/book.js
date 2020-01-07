import React from 'react';
import { Book } from '../../model';

type bookProps = {
    book: Book,
    bookAction: (book: Book) => void,
    actionCaption: string
}

const BookItem = ({ book, bookAction, actionCaption }: bookProps) => (
    <div className='book-grid-container'>
        <div className="book-title">{book.title}</div>
        <div className="book-picture">
            {book.images ? <img src={book.images.small} /> : ''}
        </div>
        <div className="book-description">{book.description}</div>
        <div className="book-actions">Price: {book.price} <a href='#' className='standard-button' onClick={() => { bookAction(book); }}>{actionCaption}</a></div>
    </div>
);

export default BookItem;
