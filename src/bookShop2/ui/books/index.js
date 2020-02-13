/* eslint-disable no-unused-vars */
import React from 'react';
import { useBooks, useBasket } from '../../../bookShop/store';
import { loadBooks, filterBooks } from '../../../bookShop/books/actions';
import { addToBasket, removeFromBasket } from '../../../bookShop/basket/actions';
import { basketImg } from '../../../images';
import BookItem from '../../../bookShop/books/ui/book';

class BookList extends React.Component {
    constructor(state, context) {
        super(state, context);
        // Very important:
        // you need to define proper state, with proper properties
        // they need to match portion of store you are serving here.
        this.state = {
            basket: {
                books: [],
                totalPrice: 0
            },
            books: {
                filter: '',
                books: []
            }
        };
    }

    componentDidMount() {
        // this are key changes.................. sending this in array (don't forget!) as first parameter
        const [LoadBooks, FilterBooks] = useBooks([this], loadBooks, filterBooks);
        const [AddToBasket, RemoveFromBasket] = useBasket([this], addToBasket, removeFromBasket);

        // now bind actions.
        this.LoadBooks = LoadBooks;
        this.FilterBooks = FilterBooks;
        this.AddToBasket = AddToBasket;
        this.RemoveFromBasket = RemoveFromBasket;
        this.LoadBooks();
    }

    render() {
        return (
            <div className='books-grid-container'>
                <div className='books-list-caption'>
                Books C
                </div>
                <div className='book-list-search'>
                    <input className='search-box' onChange={(e) => this.FilterBooks(e.target.value)}></input>
                </div>
                <div className='book-list-basket'>
                    <div className='basket-logo'>
                        <img src={basketImg} height={50} />
                    </div>
                    <div className='book-list-basket-price'>
                    price: {this.state.basket.totalPrice}
                        <br/>
                        items: ({this.state.basket.books.length})
                    </div>
                </div>
                <div className='book-list'>
                    {this.state.books.books ? this.state.books.books.map((book) => (book.inBasket === true
                        ? <BookItem key={book.id} book={book} bookAction={this.RemoveFromBasket} actionCaption='Remove from basket' />
                        : <BookItem key={book.id} book={book} bookAction={this.AddToBasket} actionCaption='Add to basket' />
                    )) : <p>0</p>}
                </div>
            </div>
        );
    }
}

export default BookList;
