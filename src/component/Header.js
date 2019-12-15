import React, { Component } from 'react';
import logo from '../image/logo.png';
import '../scss/Header.scss';

export default class Header extends Component {
    render(){
        return (
            <div className="card center-align header-image">
                <img src={logo} className="card-content center-align logo" alt="logo"/>
            </div>
        );
    }
}
