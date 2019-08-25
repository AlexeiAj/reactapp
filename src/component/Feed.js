import React, { Component } from 'react';
import '../scss/materialize.scss';

export default class Feed extends Component {

    componentWillMount(){
        if(localStorage.getItem('auth-token') === null) this.props.history.replace("/");
    }

    render(){
        return (
            <div>
                alexei
            </div>
        );
    }
}
