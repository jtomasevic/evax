import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import BooksList from './books/ui/bookList';
import history from './common/history';
import { BookList, SignIn, SignUp } from './bookShop';
import { reducers } from './bookShop/reducers';
import { HelloWorld } from './helloWorld';

reducers();
render(
    <Router history={history}>
        <Route exact path="/" component={BookList} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/hello" component={HelloWorld} />
    </Router>, document.getElementById('app')
);
module.hot.accept();
