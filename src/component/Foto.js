import React, { Component } from 'react';
import { Modal } from 'react-materialize';
import '../scss/Foto.scss';

export default class Foto extends Component {

    constructor() {
        super();
        this.state = {foto: [], openConsultar: false, openAlterar: false};
    }
    
    componentDidMount(){
        this.setState({foto: this.props.foto});
    }

    excluir(e) {
        if(e.stopPropagation) e.stopPropagation();
        let token = localStorage.getItem('auth-token');
        if(token === null) this.props.history.replace("/");
        
        const uri = `${this.props.url}/fotos/${this.props.foto.id}`;
        const requestInfo = {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': token
            })
        }

        fetch(uri, requestInfo)
            .then(response => {
                if(response.ok){
                    this.props.recarregarGaleriaCallback();
                    return;
                } 
                throw new Error("Não foi possível deletar o conteúdo.");
            })
            .catch(e => this.setState({mensagem: e.message}));
    }

    openCloseModalConsultar(isOpen){
        if(this.state.openAlterar) return;
        this.setState({ openConsultar: isOpen });
    }

    render(){
        let foto = this.state.foto;
        let optionsConsultar = {
            onCloseEnd: () => this.openCloseModalConsultar(false)
        }

        return (
            <div className="col s4">
                <div className="card">
                    <div className="card-image" onClick={() => this.openCloseModalConsultar(true)}>
                        <div className="div-image"><img src={`${this.props.url}${foto.imagem_path}${foto.imagem_name}`}></img></div>
                        <a className="btn-floating halfway-fab waves-effect waves-light grey darken-4" onClick={this.excluir.bind(this)}><i className="material-icons">delete</i></a>
                    </div>
                    <div className="card-content">
                        {foto.imagem_name}
                    </div>
                </div>
                <Modal header={foto.imagem_name} open={this.state.openConsultar} options={optionsConsultar}>
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <div className="img-consulta"><img src={`${this.props.url}${foto.imagem_path}${foto.imagem_name}`}></img></div>
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
}
