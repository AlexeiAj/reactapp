import React, { Component } from 'react';
import '../scss/Navbar.scss';

export default class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {value:''}
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({ value: e.target.value });
        this.props.recarregarFeedCallback(this.state.value);
    }

    render() {
        return (
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper grey lighten-2 z-depth-1">
                        <a href="/feed" className="brand-logo black-text text-lighten-4 left logo-home"><i className="material-icons">home</i></a>
                        <ul id="nav-mobile" className="right">
                            <li><a href="/galeria" className="black-text text-lighten-4">Galeria</a></li>
                            <li><a href="http://alexeiaj.duckdns.org:8700" className="black-text text-lighten-4">Nave Game</a></li>
                            <li><a href="http://alexeiaj.duckdns.org:8600" className="black-text text-lighten-4">Unity Projects</a></li>
                        </ul>
                        <form>
                            <div className="input-field right grey lighten-3 hide-on-med-and-down">
                                <input id="search" type="search" value={this.state.value} onChange={this.handleChange}></input>
                                <label className="label-icon" htmlFor="search"><i className="material-icons black-text text-darken-1">search</i></label>
                                <i className="material-icons">close</i>
                            </div>
                        </form>
                    </div>
                </nav>
            </div>
        );
    }
}
