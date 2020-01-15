import React from 'react';
import { useBasket } from '../../store';
import { removeFromBasket } from '../actions';
import { basketImg } from '../../../images';
import BookItem from '../../books/ui/book';
import history from '../../../common/history';

const Basket = () => {
    const [basket, RemoveFromBasket] = useBasket(removeFromBasket);

    return (
        <div className='books-grid-container'>
            <div className='books-list-caption'>
                 Basket
            </div>
            <div className='book-list-search'>
                <a href="#" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); history.push('/'); }}>back to books</a>
            </div>
            <div className='book-list-basket'>
                <div className='basket-logo'>
                    <img src={basketImg} height={50} />
                </div>
                <div className='book-list-basket-price'>
                    price: {basket.totalPrice}
                    <br/>
                    items: ({basket.books.length})
                </div>
            </div>
            <div className='book-list'>
                {basket.books.map((book) => <BookItem key={book.id} book={book} bookAction={RemoveFromBasket} actionCaption='Remove from basket' />)}
            </div>
        </div>
    );
};

export default Basket;
