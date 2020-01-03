import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router-dom';
// import BooksList from './books/ui/bookList';
import history from './common/history';
import BookList from './bookShop/books/ui';

render(
    <Router history={history}>
        <Route exact path="/" component={BookList} />
    </Router>, document.getElementById('app')
);
