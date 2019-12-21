import React, { Component } from 'react';
import { Modal } from 'react-materialize';

export default class Usuario extends Component {

    constructor() {
        super();
        this.state = {errMsg: '', usuario: [], openConsultar: false, openAlterar: false};
    }

    componentDidMount(){
        this.setState({usuario:  this.props.usuario});
    }

    salvar(e){
        e.preventDefault();
        const uri = `${this.props.url}/usuarios/${this.props.usuario.id}`;
        
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
                    let usuarioNovo = {};
                    usuarioNovo.login = this.login.value;
                    usuarioNovo.senha = this.senha.value;
                    usuarioNovo.id = this.state.usuario.id;
                    this.setState({usuario: usuarioNovo});
                    return;
                }
                throw new Error("Não foi possível alterar o usuario.");
            })
            .catch(e => this.setState({errMsg: e.message}));
    }

    excluir(e) {
        if(e.stopPropagation) e.stopPropagation();
        const uri = `${this.props.url}/usuarios/${this.props.usuario.id}`;
        
        const requestInfo = {
            method: 'DELETE'
        }

        fetch(uri, requestInfo)
            .then(response => {
                if(response.ok){
                    this.props.recarregarUsuariosCallback();
                    return;
                } 
                throw new Error("Não foi possível deletar o usuario.");
            })
            .catch(e => this.setState({mensagem: e.message}));
    }

    openCloseModalConsultar(isOpen){
        if(this.state.openAlterar) return;
        this.setState({ openConsultar: isOpen });
    }

    openCloseModalAlterar(isOpen, e){
        this.setState({ openAlterar: isOpen });
        if(e.stopPropagation) e.stopPropagation();
    }

    render(){
        let usuario = this.state.usuario;
        let optionsConsultar = {
            onCloseEnd: () => this.openCloseModalConsultar(false)
        }
        let optionsAlterar = {
            onCloseEnd: this.openCloseModalAlterar.bind(this, false)
        }

        return (
            <tr className="linha" onClick={() => this.openCloseModalConsultar(true)}>
                <td><span>{usuario.id}</span></td>
                <td><span>{usuario.login}</span></td>
                <td><span>{usuario.senha}</span></td>
                <td>
                    <div>
                        <div className="waves-effect waves-light btn grey darken-4" onClick={this.openCloseModalAlterar.bind(this, true)}><i className="material-icons">create</i></div>
                        <div className="waves-effect waves-light btn grey darken-4" onClick={this.excluir.bind(this)}><i className="material-icons">delete</i></div>
                    </div>
                </td>
                <Modal header="Alterar usuario" open={this.state.openAlterar} options={optionsAlterar}>
                    <form className="col s12" onSubmit={this.salvar.bind(this)} method="post">
                        <span>{this.state.errMsg}</span>
                        <div className="row">
                            <div className="input-field col s12">
                                <input defaultValue={usuario.login} type="text" id={`login${usuario.id}`} className="validate" ref={ input => this.login = input}/>
                                <label htmlFor={`login${usuario.id}`} className="active">Login</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input type="password" id={`senha${usuario.id}`} className="validate" ref={ input => this.senha = input}/>
                                <label htmlFor={`senha${usuario.id}`} className="active">Senha</label>
                            </div>
                        </div>
                        <button className="btn waves-effect waves-light grey darken-4" type="submit" name="action">
                            Alterar
                            <i className="material-icons right">send</i>
                        </button>
                    </form>
                </Modal>
                <Modal header="Consultar usuario" open={this.state.openConsultar} options={optionsConsultar}>
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <label><b>Login</b> {usuario.login}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <label><b>Senha</b> {usuario.senha}</label>
                            </div>
                        </div>
                    </form>
                </Modal>
            </tr>
        );
    }
}
