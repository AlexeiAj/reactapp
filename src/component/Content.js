import React, { Component } from 'react';
import { Modal } from 'react-materialize';
import '../scss/Content.scss';
import ListaFotos from '../component/ListaFotos';

export default class Content extends Component {

    constructor() {
        super();
        this.state = {content: [], post_conteudo: {}, openConsultar: false, openAlterar: false};
    }
    
    componentDidMount(){
        this.setState({content: this.props.content});
        this.setState({post_conteudo: JSON.parse(this.props.content.post_conteudo)});
    }

    excluir(e) {
        if(e.stopPropagation) e.stopPropagation();
        let token = localStorage.getItem('auth-token');
        if(token === null) this.props.history.replace("/");
        
        const uri = `${this.props.url}/posts/${this.props.content.id}`;
        const requestInfo = {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': token
            })
        }

        fetch(uri, requestInfo)
            .then(response => {
                if(response.ok){
                    this.props.recarregarFeedCallback();
                    return;
                } 
                throw new Error("Não foi possível deletar o conteúdo.");
            })
            .catch(e => this.setState({mensagem: e.message}));
    }

    salvar(e){
        e.preventDefault();

        let token = localStorage.getItem('auth-token');
        if(token === null) this.props.history.replace("/");

        const uri = `${this.props.url}/posts/${this.props.content.id}`;

        let post_conteudo = JSON.stringify({
                texto: this.texto.value,
                imagem: this.imagem.value
            });

        const requestInfo = {
            method: 'PUT',
            body: JSON.stringify({
                post_titulo: this.post_titulo.value,
                post_data: this.post_data.value,
                post_categoria: this.post_categoria.value,
                post_conteudo: post_conteudo
            }),
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': token
            })
        }

        fetch(uri, requestInfo)
            .then(response => {
                if(response.ok){
                    let postNovo = {};
                    postNovo.post_titulo = this.post_titulo.value;
                    postNovo.post_data = this.post_data.value;
                    postNovo.post_categoria = this.post_categoria.value;
                    postNovo.post_conteudo = post_conteudo;
                    postNovo.id = this.state.content.id;
                    this.setState({content: postNovo});
                    this.setState({post_conteudo: JSON.parse(post_conteudo)});
                    return;
                }
                throw new Error("Não foi possível alterar o post.");
            })
            .catch(e => this.setState({errMsg: e.message}));
    }

    selecionarFotoGaleria(path){
        this.imagem.value = path;
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
        let content = this.state.content;
        let jsonContent = this.state.post_conteudo;
        let optionsConsultar = {
            onCloseEnd: () => this.openCloseModalConsultar(false)
        }
        let optionsAlterar = {
            onCloseEnd: this.openCloseModalAlterar.bind(this, false)
        }

        return (
            <div className="row">
                <div className="col s12">
                    <div className="card">
                        <div className="card-image" onClick={() => this.openCloseModalConsultar(true)}>
                            <div className="div-image"><img src={`${this.props.url}${jsonContent.imagem}`}></img></div>
                            <span className="card-title">{content.post_titulo}</span>

                            <a className="btn-floating halfway-fab waves-effect waves-light grey darken-4" onClick={this.excluir.bind(this)}><i className="material-icons">delete</i></a>
                            <a className="btn-floating halfway-fab waves-effect waves-light grey darken-4 right-button" onClick={this.openCloseModalAlterar.bind(this, true)}><i className="material-icons">create</i></a>
                        </div>
                        <div className="card-content">
                            {jsonContent.texto}
                            <p>{content.post_data}{content.post_categoria}</p>
                        </div>
                    </div>
                </div>
                <Modal header="Alterar post" open={this.state.openAlterar} options={optionsAlterar}>
                    <form className="col s12" onSubmit={this.salvar.bind(this)} method="post">
                        <span>{this.state.errMsg}</span>
                        <div className="row">
                            <div className="input-field col s12">
                                <input defaultValue={content.post_titulo} type="text" id={`post_titulo${content.id}`} className="validate" ref={ input => this.post_titulo = input}/>
                                <label htmlFor={`post_titulo${content.id}`} className="active">Título</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input defaultValue={content.post_data} type="text" id={`post_data${content.id}`} className="validate" ref={ input => this.post_data = input}/>
                                <label htmlFor={`post_data${content.id}`} className="active">Data</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input defaultValue={content.post_categoria} type="text" id={`post_categoria${content.id}`} className="validate" ref={ input => this.post_categoria = input}/>
                                <label htmlFor={`post_categoria${content.id}`} className="active">Categoria</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input defaultValue={jsonContent.texto} type="text" id={`texto${content.id}`} className="validate" ref={ input => this.texto = input}/>
                                <label htmlFor={`texto${content.id}`} className="active">Texto</label>
                            </div>
                        </div>
                        <ListaFotos url={this.props.url} selecionarCallback={this.selecionarFotoGaleria.bind(this)}/>
                        <div className="row">
                            <div className="input-field col s12">
                                <input type="text" defaultValue={jsonContent.imagem} readOnly id={`imagem${content.id}`} className="validate" ref={ input => this.imagem = input}/>
                            </div>
                        </div>
                        <br/>
                        <button className="btn waves-effect waves-light grey darken-4" type="submit" name="action">
                            Alterar
                            <i className="material-icons right">send</i>
                        </button>
                    </form>
                </Modal>
                <Modal header={content.post_titulo} open={this.state.openConsultar} options={optionsConsultar}>
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <div className="img-consulta"><img src={`${this.props.url}${jsonContent.imagem}`}></img></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <label><b>Data</b> {content.post_data} <b>Categoria</b> {content.post_categoria}</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <label>{jsonContent.texto}</label>
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
}
