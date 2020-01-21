import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import history from './common/history';
import { BookList, SignIn, SignUp, Basket } from './bookShop';
import { BookListClassStyle, SignInClassStyle } from './bookShop2';
import { reducers } from './bookShop/reducers';
import { HelloAsync, HelloSync, HelloBindingsSync, HelloBindingsAync } from './helloWorld';
import { todoList } from './todo';
import { todoList2 } from './todoAutoArrayMode';
import { todoList3 } from './todoAutoArrayModeWithUpdate';
import { todoList4 } from './todoAutoArrayModeWithUpdateAsync';

reducers();
render(
    <Router history={history}>
        <Route exact path="/" component={BookList} />
        <Route exact path="/basket" component={Basket} />
        <Route exact path="/books2" component={BookListClassStyle} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signin2" component={SignInClassStyle} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/todo" component={todoList} />
        <Route exact path="/todo2" component={todoList2} />
        <Route exact path="/todo3" component={todoList3} />
        <Route exact path="/todo4" component={todoList4} />
        <Route exact path="/hello" component={HelloSync} />
        <Route exact path="/hello2" component={HelloAsync} />
        <Route exact path="/hello3" component={HelloBindingsSync} />
        <Route exact path="/hello4" component={HelloBindingsAync} />
    </Router>, document.getElementById('app')
);
module.hot.accept();
