import React, { Component } from 'react';
import { Modal, DatePicker } from 'react-materialize';
import '../scss/Feed.scss';
import Content from '../component/Content';
import Header from '../component/Header';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import ListaFotos from '../component/ListaFotos';

export default class Feed extends Component {

    constructor() {
        super();
        
        // this.state = {posts: [], url: 'http://alexeiaj.duckdns.org:8800'};
        this.state = {posts: [], url: 'http://localhost:8800', search: null};
    }
    
    componentDidMount(){
        let token = localStorage.getItem('auth-token');
        if(token === null) this.props.history.replace("/");

        let requestInfo = {
                headers: new Headers({
                    'Authorization': token,
                })
            };
        
        let uri = `${this.state.url}/posts`;

        fetch(uri, requestInfo)
            .then(response => response.json())
            .then(posts => this.setState({posts: posts}));
    }
    
    recarregarFeed(search){
        let token = localStorage.getItem('auth-token');
        if(token === null) this.props.history.replace("/");
        
        let requestInfo = {
            headers: new Headers({
                'Authorization': token
            })
        };
        
        let uri = `${this.state.url}/posts`;
        if(search != null) uri += '?search=' + search;
        
        fetch(uri, requestInfo)
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
        
        this.post_data = `${this.post_data.getFullYear()}-${this.post_data.getMonth()+1}-${this.post_data.getDate()}`;

        const uri = `${this.state.url}/posts/`;

        let post_conteudo = JSON.stringify({
                texto: this.texto.value,
                imagem: this.imagem.value
            });

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                post_titulo: this.post_titulo.value,
                post_data: this.post_data,
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
                    this.post_titulo.value = this.post_data = this.post_categoria.value = this.texto.value = this.imagem.value = '';
                    this.recarregarFeed();
                    return;
                }
                throw new Error("Não foi possível adicionar o post.");
            })
            .catch(e => this.setState({errMsg: e.message}));
    }

    selecionarFotoGaleria(path){
        this.imagem.value = path;
    }

    render(){
        return (
            <div>
                <Navbar recarregarFeedCallback={this.recarregarFeed.bind(this)}/>
                <Header/>
                <div className="container">
                    {
                        this.state.posts.map(content => <Content key={content.id} content={content} url={this.state.url} recarregarFeedCallback={() => this.recarregarFeed()}/>)
                    }
                    <Modal header="Adicionar post" trigger={<div className="waves-effect waves-light btn grey darken-4">Adicionar</div>}>
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
                                    <DatePicker type="text" id={'post_data'} className="validate" onChange={input => this.post_data = input}/>
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
                            <ListaFotos url={this.state.url} selecionarCallback={this.selecionarFotoGaleria.bind(this)}/>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input type="text" readOnly id={'imagem'} className="validate" ref={ input => this.imagem = input}/>
                                </div>
                            </div>
                            <br/>
                            <button className="btn waves-effect waves-light grey darken-4" type="submit" name="action">
                                Adicionar
                                <i className="material-icons right">send</i>
                            </button>
                        </form>
                    </Modal>
                    <div className="waves-effect waves-light btn grey darken-1 logout" onClick={this.deslogar.bind(this)}>Logout</div>
                    <Footer/>
                </div>
            </div>
        );
    }
}
