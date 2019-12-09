import React, { Component } from 'react';
import '../scss/materialize.scss';
import '../scss/Feed.scss';
import Content from './Content';
import { Modal } from 'react-materialize';

export default class Feed extends Component {

    constructor() {
        super();
        this.state = {posts: []};
    }

    componentWillMount(){
        let token = localStorage.getItem('auth-token');
        if(token === null) this.props.history.replace("/");

        let requestInfo = {
                headers: new Headers({
                    'Authorization': token
                })
            };
        
        fetch('http://localhost:8800/posts', requestInfo)
            .then(response => response.json())
            .then(posts => this.setState({posts: posts}));
    }

    recarregarFeed(){
        let token = localStorage.getItem('auth-token');
        if(token === null) this.props.history.replace("/");

        let requestInfo = {
                headers: new Headers({
                    'Authorization': token
                })
            };
        
        fetch('http://localhost:8800/posts', requestInfo)
            .then(response => response.json())
            .then(posts => this.setState({posts: posts}));
    }

    deslogar(){
        localStorage.removeItem('auth-token');
        this.props.history.push("/");
    }

    adicionar(e){
        e.preventDefault();

        let token = localStorage.getItem('auth-token');
        if(token === null) this.props.history.replace("/");

        const uri = `http://localhost:8800/posts/`;

        let post_conteudo = JSON.stringify({
                texto: this.texto.value,
                imagem: this.imagem.value
            });

        const requestInfo = {
            method: 'POST',
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
                    this.post_titulo.value = this.post_data.value = this.post_categoria.value = this.texto.value = this.imagem.value = '';
                    this.recarregarFeed();
                    return;
                }
                throw new Error("Não foi possível adicionar o post.");
            })
            .catch(e => this.setState({errMsg: e.message}));
    }

    render(){
        return (
            <div>
                {
                    this.state.posts.map(content => <Content key={content.id} content={content} recarregarFeedCallback={() => this.recarregarFeed()}/>)
                }
                <Modal header="Adicionar post" trigger={<a className="waves-effect waves-light btn grey darken-4">Adicionar</a>}>
                    <form className="col s12" onSubmit={this.adicionar.bind(this)} method="post">
                        <span>{this.state.errMsg}</span>
                        <div className="row">
                            <div className="input-field col s12">
                                <input type="text" id={'post_titulo'} className="validate" ref={ input => this.post_titulo = input}/>
                                <label htmlFor={'post_titulo'}>Título</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input type="text" id={'post_data'} className="validate" ref={ input => this.post_data = input}/>
                                <label htmlFor={'post_data'}>Data</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input type="text" id={'post_categoria'} className="validate" ref={ input => this.post_categoria = input}/>
                                <label htmlFor={'post_categoria'}>Categoria</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input type="text" id={'texto'} className="validate" ref={ input => this.texto = input}/>
                                <label htmlFor={'texto'}>Texto</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input type="text" id={'imagem'} className="validate" ref={ input => this.imagem = input}/>
                                <label htmlFor={'imagem'}>Imagem</label>
                            </div>
                        </div>
                        <br/>
                        <button className="btn waves-effect waves-light grey darken-4" type="submit" name="action">
                            Adicionar
                            <i className="material-icons right">send</i>
                        </button>
                    </form>
                </Modal>
                <a className="waves-effect waves-light btn grey darken-1 logout" onClick={this.deslogar.bind(this)}>Logout</a>
            </div>
        );
    }
}
