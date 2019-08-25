import React, { Component } from 'react';
import '../scss/materialize.scss';
import { Modal } from 'react-materialize';

export default class Usuario extends Component {

    constructor() {
        super();
        this.state = {errMsg: ''};
    }

    salvar(e){
        e.preventDefault();
        const uri = `http://alexeiaj.duckdns.org:8800/usuarios/${this.props.usuario.id}`;
        
        const requestInfo = {
            method: 'PUT',
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
                    this.props.history.replace("/listaUsuarios");
                    return;
                }
                throw new Error("Não foi possível alterar o usuario.");
            })
            .catch(e => this.setState({errMsg: e.message}));
    }

    excluir() {
        const uri = `http://alexeiaj.duckdns.org:8800/usuarios/${this.props.usuario.id}`;
        
        const requestInfo = {
            method: 'DELETE'
        }

        fetch(uri, requestInfo)
            .then(response => {
                if(response.ok){
                    this.props.history.replace("/listaUsuarios");
                    return;
                } 
                throw new Error("Não foi possível deletar o usuario.");
            })
            .catch(e => this.setState({mensagem: e.message}));
    }


    render(){
        let usuario = this.props.usuario;

        return (
            <tr className="linha">
                <td><span>{usuario.id}</span></td>
                <td><span>{usuario.login}</span></td>
                <td><span>{usuario.senha}</span></td>
                <td>
                    <div>
                        <Modal header="Alterar usuario" trigger={<a className="waves-effect waves-light btn grey darken-4"><i className="material-icons">create</i></a>}>
                            <form className="col s12" onSubmit={this.salvar.bind(this)} method="post">
                                <span>{this.state.errMsg}</span>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input placeholder="Login" defaultValue={usuario.login} type="text" id={`login${usuario.id}`} className="validate" ref={ input => this.login = input}/>
                                        <label htmlFor={`login${usuario.id}`}>Login</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input placeholder="Senha" type="password" id={`senha${usuario.id}`} className="validate" ref={ input => this.senha = input}/>
                                        <label htmlFor={`senha${usuario.id}`}>Senha</label>
                                    </div>
                                </div>
                                <button className="btn waves-effect waves-light grey darken-4" type="submit" name="action">
                                    Alterar
                                    <i className="material-icons right">send</i>
                                </button>
                            </form>
                        </Modal>
                        <a className="waves-effect waves-light btn grey darken-4" on onClick={this.excluir.bind(this)}><i className="material-icons">delete</i></a>
                        <input type="hidden" className="id" value={usuario.id}/>
                    </div>			
                </td>
            </tr>
        );
    }
}
