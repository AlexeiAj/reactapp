import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Website from './view/Website';
import Login from './component/Login';
import ListaUsuarios from './component/ListaUsuarios';
import Feed from './component/Feed';

ReactDOM.render(
    <BrowserRouter>
        <Website>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route path="/listaUsuarios" component={ListaUsuarios}/>
                <Route path="/feed" component={Feed}/>
            </Switch>
        </Website>
    </BrowserRouter>
, document.getElementById('root'));
serviceWorker.unregister();