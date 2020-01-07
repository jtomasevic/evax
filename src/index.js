import React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import history from './common/history';
import { BookList, SignIn, SignUp } from './bookShop';
import { reducers } from './bookShop/reducers';
import { HelloAsync, HelloSync, HelloBindingsSync } from './helloWorld';

reducers();

render(
    <Router history={history}>
        <Route exact path="/" component={BookList} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/hello" component={HelloSync} />
        <Route exact path="/hello2" component={HelloAsync} />
        <Route exact path="/hello3" component={HelloBindingsSync} />
    </Router>, document.getElementById('app')
);
module.hot.accept();
