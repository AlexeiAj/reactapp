import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Website from './view/Website';
import Login from './view/Login';
import ListaUsuarios from './view/ListaUsuarios';
import Feed from './view/Feed';
import Galeria from './view/Galeria';

ReactDOM.render(
    <BrowserRouter>
        <Website>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route path="/listaUsuarios" component={ListaUsuarios}/>
                <Route path="/feed" component={Feed}/>
                <Route path="/galeria" component={Galeria}/>
            </Switch>
        </Website>
    </BrowserRouter>
, document.getElementById('root'));
serviceWorker.unregister();