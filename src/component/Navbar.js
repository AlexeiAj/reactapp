import React, { Component } from 'react';

export default class Header extends Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper grey lighten-4">
                    <a href="/feed" className="brand-logo black-text center"><i className="material-icons">home</i></a>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger black-text"><i className="material-icons">menu</i></a>
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li><a href="/galeria" className="black-text">Galeria</a></li>
                        <li><a href="http://alexeiaj.duckdns.org:8700" className="orange-text">▀▄▀▄▀▄ Nᴀᴠᴇ Gᴀᴍᴇ ▄▀▄▀▄▀</a></li>
                        <li><a href="http://alexeiaj.duckdns.org:8600" className="orange-text">▀▄▀▄▀▄ Unity Projects ▄▀▄▀▄▀</a></li>
                    </ul>
                    <ul className="sidenav" id="mobile-demo">
                        <li><a href="/galeria" className="black-text">Galeria</a></li>
                        <li><a href="http://alexeiaj.duckdns.org:8700" className="orange-text">▀▄▀▄▀▄ Nᴀᴠᴇ Gᴀᴍᴇ ▄▀▄▀▄▀</a></li>
                        <li><a href="http://alexeiaj.duckdns.org:8600" className="orange-text">▀▄▀▄▀▄ Unity Projects ▄▀▄▀▄▀</a></li>
                    </ul>
                    <form>
                        <div className="input-field right grey lighten-2">
                            <input id="search" type="search"></input>
                            <label className="label-icon" htmlFor="search"><i className="material-icons black-text">search</i></label>
                            <i className="material-icons">close</i>
                        </div>
                    </form>
                </div>
            </nav>
        );
    }
}
