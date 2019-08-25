import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../scss/materialize.scss';
import Usuario from './Usuario';

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

    render(){
        return (
            <div>
                <h3>Bem vindo ao cadastro de usuarios!</h3>
                <p>Lista de usuarios</p>
        
                <div className="row">
                    <div className="col s12">
                        <table className="table table-hover">
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
                                    this.state.usuarios.map(usuario => <Usuario key={usuario.id} usuario={usuario}/>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <Link to="/" className="waves-effect waves-light btn grey darken-4">Entrar</Link>
                <a className="waves-effect waves-light btn grey darken-4">Adicionar</a>
            </div>
        );
    }
}
