import React, { Component } from 'react';
import '../scss/materialize.scss';

export default class Website extends Component {
    render(){
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
