import React, { Component } from 'react';
import { Modal } from 'react-materialize';
import '../scss/ListaFotos.scss';

export default class ListaFotos extends Component {

    constructor() {
        super();
        this.state = {fotos: [], openConsultar: false};
    }
    
    componentDidMount(){
        let token = localStorage.getItem('auth-token');
        if(token === null) this.props.history.replace("/");

        let requestInfo = {
                headers: new Headers({
                    'Authorization': token
                })
            };
        
        fetch(`${this.props.url}/fotos`, requestInfo)
            .then(response => response.json())
            .then(fotos => this.setState({fotos: fotos}));
    }

    openCloseModalConsultar(isOpen){
        if(this.state.openAlterar) return;
        this.setState({ openConsultar: isOpen });
    }

    selecionarFoto(path){
        this.openCloseModalConsultar(false);
        this.props.selecionarCallback(path);
    }

    render(){
        let optionsConsultar = {
            onCloseEnd: () => this.openCloseModalConsultar(false)
        }

        return (
            <div>
                <a className="waves-effect waves-light btn grey darken-4" onClick={() => this.openCloseModalConsultar(true)}>Galeria</a>
                <Modal header="Galeria" open={this.state.openConsultar} options={optionsConsultar}>
                    <div className="container">
                        <div className="row">
                            {
                                this.state.fotos.map(foto => 
                                    <div className="col s3" key={foto.id}>
                                        <div className="card">
                                            <div className="card-image listaFotos" onClick={() => this.selecionarFoto(foto.imagem_path + foto.imagem_name)}>
                                                <div className="imagem-galeria">
                                                    <img src={`${this.props.url}${foto.imagem_path}${foto.imagem_name}`}></img>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}
