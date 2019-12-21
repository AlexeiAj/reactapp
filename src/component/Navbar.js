import React, { Component } from 'react';

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
            <nav>
                <div className="nav-wrapper grey lighten-4">
                    <a href="/feed" className="brand-logo black-text left"><i className="material-icons">home</i>Home</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="/galeria" className="black-text">Galeria</a></li>
                        <li><a href="http://alexeiaj.duckdns.org:8700" className="black-text">Nave Game</a></li>
                        <li><a href="http://alexeiaj.duckdns.org:8600" className="black-text">Unity Projects</a></li>
                    </ul>
                    <form>
                        <div className="input-field right grey lighten-2">
                            <input id="search" type="search" value={this.state.value} onChange={this.handleChange}></input>
                            <label className="label-icon" htmlFor="search"><i className="material-icons black-text">search</i></label>
                            <i className="material-icons">close</i>
                        </div>
                    </form>
                </div>
            </nav>
        );
    }
}
