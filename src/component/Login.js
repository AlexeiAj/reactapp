import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../scss/materialize.scss';

export default class Login extends Component {

    constructor() {
        super();
        this.state = {login: '', senha: '', errMsg: ''};
    }

    logar(e){
        e.preventDefault();
        
        if(this.login.value === '' || this.senha.value === ''){
            this.setState({errMsg: 'Por favor preencha login e senha!'})
            return;
        }

        const uri = "http://localhost:8800/auth";
        
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                login: this.login.value,
                senha: this.senha.value,
            }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        }

        fetch(uri, requestInfo)
            .then(response => {
                if(response.ok) return response.text();
                throw new Error("Não foi possível efetuar login.");
            })
            .then(json => {
                let tokenObj = JSON.parse(json);
                return `${tokenObj.tipo} ${tokenObj.token}`;
            })
            .then(token => {
                localStorage.setItem('auth-token', token);
                this.props.history.push("/feed");
            })
            .catch(e => this.setState({errMsg: e.message}));
    }

    render(){
        return (
            <div>
                <h3>Bem vindo ao meu website!</h3>
                <p>Pagina de login</p>
        
                <div className="row">
                    <div className="col s4"></div>
                    <div className="col s4">
                        <div className="row">
                            <form className="col s12" onSubmit={this.logar.bind(this)} method="post">
                                <span>{this.state.errMsg}</span>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input type="text" id="login" className="validate" ref={ input => this.login = input}/>
                                        <label htmlFor="login">Login</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input type="password" id="senha" className="validate" ref={ input => this.senha = input}/>
                                        <label htmlFor="senha">Senha</label>
                                    </div>
                                </div>
                                <button className="btn waves-effect waves-light grey darken-4" type="submit" name="action">
                                    Entrar
                                    <i className="material-icons right">send</i>
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="col s4"></div>
                </div>

                <Link to="/listaUsuarios" className="waves-effect waves-light btn grey darken-4">Lista de usuarios</Link>
            </div>
        );
    }
}
