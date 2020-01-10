/* eslint-disable no-unused-vars */
import React from 'react';
import { useBooks, useShoopingBag } from '../../../bookShop/store';
// import { useBooks } from '../../../bookShop/store';
import { loadBooks, filterBooks } from '../../../bookShop/books/actions';
import { addToBasket, removeFromBasket } from '../../../bookShop/basket/actions';
import { basketImg } from '../../../images';
import BookItem from '../../../bookShop/books/ui/book';

class BookList extends React.Component {
    constructor(state, context) {
        super(state, context);
        this.state = {
            shoopingBag: {
                books: []
            },
            books: {
                filter: '',
                books: []
            }
        };
        // this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        const [store, LoadBooks, FilterBooks] = useBooks([this, this.setState, this.state], loadBooks, filterBooks);
        const [basket, AddToBasket, RemoveFromBasket] = useShoopingBag([this, this.setState, this.state], addToBasket, removeFromBasket);

        this.LoadBooks = LoadBooks;
        this.FilterBooks = FilterBooks;
        this.AddToBasket = AddToBasket;
        this.RemoveFromBasket = RemoveFromBasket;
        this.LoadBooks();
    }

    static getDerivedStateFromProps(nextProps) {
        console.log('next props', nextProps);
        return nextProps;
    }

    render() {
        console.log('RENDER', this.state.books);
        console.log('RENDER basket', this.state.basket);
        return (
            <div className='books-grid-container'>
                <div className='books-list-caption'>
                Books
                </div>
                <div className='book-list-search'>
                    <input className='search-box' value={this.state.books.filter} onChange={(e) => this.FilterBooks(e.target.value)}></input>
                </div>
                <div className='book-list-basket'>
                    <div className='basket-logo'>
                        <img src={basketImg} height={50} />
                    </div>
                    <div className='book-list-basket-price'>
                    price: {this.state.shoopingBag.totalPrice}
                        <br/>
                        items: ({this.state.shoopingBag.books.length})
                    </div>
                </div>
                <div className='book-list'>
                    {this.state.books ? this.state.books.books.map((book) => (book.inBasket === true
                        ? <BookItem key={book.id} book={book} bookAction={this.RemoveFromBasket} actionCaption='Remove from basket' />
                        : <BookItem key={book.id} book={book} bookAction={this.AddToBasket} actionCaption='Add to basket' />
                        // ? <BookItem key={book.id} book={book} bookAction={() => console.log('remove') } actionCaption='Remove from basket' />
                        // : <BookItem key={book.id} book={book} bookAction={() => console.log('add')} actionCaption='Add to basket' />
                    )) : <p>0</p>}
                </div>
            </div>
        );
    }
}

export default BookList;
