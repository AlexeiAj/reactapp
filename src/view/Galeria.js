import React, { Component } from 'react';
import { Modal } from 'react-materialize';
import '../scss/Feed.scss';
import Foto from '../component/Foto';
import Header from '../component/Header';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';

export default class Galeria extends Component {

    constructor() {
        super();
        // this.state = {posts: [], url: 'http://alexeiaj.duckdns.org:8800'};
        this.state = {fotos: [], url: 'http://localhost:8800'};
    }

    componentWillMount(){
        let token = localStorage.getItem('auth-token');
        if(token === null) this.props.history.replace("/");

        let requestInfo = {
                headers: new Headers({
                    'Authorization': token
                })
            };
        
        fetch(`${this.state.url}/fotos`, requestInfo)
            .then(response => response.json())
            .then(fotos => this.setState({fotos: fotos}));
    }

    recarregarGaleria(){
        let token = localStorage.getItem('auth-token');
        if(token === null) this.props.history.replace("/");

        let requestInfo = {
                headers: new Headers({
                    'Authorization': token
                })
            };
        
        fetch(`${this.state.url}/fotos`, requestInfo)
            .then(response => response.json())
            .then(fotos => this.setState({fotos: fotos}));
    }

    deslogar(){
        localStorage.removeItem('auth-token');
        this.props.history.push("/");
    }

    adicionar(e){
        e.preventDefault();

        let token = localStorage.getItem('auth-token');
        if(token === null) this.props.history.replace("/");

        const uri = `${this.state.url}/fotos/`;
        
        const formData = new FormData();
        formData.append('file',this.imagem.files[0]);

        const requestInfo = {
            method: 'POST',
            body: formData,
            headers: new Headers({
                'Authorization': token
            })
        }

        fetch(uri, requestInfo)
            .then(response => {
                if(response.ok){
                    this.recarregarGaleria();
                    return;
                }
                throw new Error("Não foi possível adicionar a foto.");
            })
            .catch(e => this.setState({errMsg: e.message}));
    }

    render(){
        return (
            <div>
                <Navbar/>
                <Header/>
                <div className="container">
                    <div className="row">
                        {
                            this.state.fotos.map(foto => <Foto key={foto.id} foto={foto} url={this.state.url} recarregarGaleriaCallback={() => this.recarregarGaleria()}/>)
                        }
                    </div>
                    <Modal header="Adicionar foto" trigger={<a className="waves-effect waves-light btn grey darken-4">Adicionar</a>}>
                        <form className="col s12" onSubmit={this.adicionar.bind(this)} method="post" encType="multipart/form-data">
                            <span>{this.state.errMsg}</span>
                            <div className="row">
                                <div className="file-field input-field col s12">
                                    <div className="btn">
                                        <span>File</span>
                                        <input type="file" ref={ input => this.imagem = input}></input>
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input className="file-path validate" type="text"></input>
                                    </div>
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
                    <Footer/>
                </div>
            </div>
        );
    }
}
