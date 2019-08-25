import React, { Component } from 'react';
import '../scss/materialize.scss';
import Header from '../component/Header';
import Footer from '../component/Footer';

export default class Website extends Component {
    render(){
        return (
            <div className="container">
                <Header/>
                {this.props.children}
                <Footer/>
            </div>
        );
    }
}
