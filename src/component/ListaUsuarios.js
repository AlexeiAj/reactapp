import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-materialize';
import Usuario from './Usuario';
import Header from '../component/Header';
import Footer from '../component/Footer';

export default class ListaUsuarios extends Component {

    constructor() {
        super();
        this.state = {usuarios: []};
    }

    componentDidMount(){
        fetch('http://alexeiaj.duckdns.org:8800/usuarios')
            .then(response => response.json())
            .then(usuarios => this.setState({usuarios: usuarios}));
    }

    recarregarUsuarios(){
        fetch('http://alexeiaj.duckdns.org:8800/usuarios')
            .then(response => response.json())
            .then(usuarios => this.setState({usuarios: usuarios}));
    }

    adicionar(e){
        e.preventDefault();
        const uri = `http://alexeiaj.duckdns.org:8800/usuarios/`;

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
                if(response.ok){
                    this.login.value = this.senha.value = '';
                    this.recarregarUsuarios();
                    return;
                }
                throw new Error("Não foi possível adicionar o usuario.");
            })
            .catch(e => this.setState({errMsg: e.message}));
    }

    render(){
        return (
            <div className="container">
                <Header/>
                <h3>Bem vindo ao cadastro de usuarios!</h3>
                <p>Lista de usuarios</p>
        
                <div className="row">
                    <div className="col s12">
                        <table className="table table-hover highlight">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Login</th>
                                    <th>Senha</th>
                                    <th>Acoes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.usuarios.map(usuario => <Usuario key={usuario.id} usuario={usuario} recarregarUsuariosCallback={() => this.recarregarUsuarios()}/>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <Link to="/" className="waves-effect waves-light btn grey darken-4">Entrar</Link>
                <Modal header="Adicionar usuario" trigger={<a className="waves-effect waves-light btn grey darken-4">Adicionar</a>}>
                    <form className="col s12" onSubmit={this.adicionar.bind(this)} method="post">
                        <span>{this.state.errMsg}</span>
                        <div className="row">
                            <div className="input-field col s12">
                                <input type="text" id={'login'} className="validate" ref={ input => this.login = input}/>
                                <label htmlFor={'login'}>Login</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input type="password" id={'senha'} className="validate" ref={ input => this.senha = input}/>
                                <label htmlFor={'senha'}>Senha</label>
                            </div>
                        </div>
                        <button className="btn waves-effect waves-light grey darken-4" type="submit" name="action">
                            Adicionar
                            <i className="material-icons right">send</i>
                        </button>
                    </form>
                </Modal>
                <Footer/>
            </div>
        );
    }
}
