import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../services/api';

import './css/styles.css';
import pici from '../assets/img/banner1.png';

import api from '../services/api';//comunica com o backend

class Lanchonete extends Component {
    state = {
        feed: [], 
    };

    async componentDidMount(){
        const id = this.props.location.state.lanchonete;
        const response = await api.get('produtos/'+id+'/lanchonete');
        this.setState({feed: response.data});
    }

    render(){
        return (
            <main>

                <div id="mainSlider" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#mainSlider" data-slide-to="0" className="active"></li>
                        <li data-target="#mainSlider" data-slide-to="1"></li>
                        <li data-target="#mainSlider" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={pici} className="d-block w-100" alt="Projetos de e-commerce" />
                            <div className="carousel-caption d-md-block">
                                <h2>Seu Pedido de lanche na UFC, do seu jeito, na hora certa, em qualquer lugar do Campus do Pici!</h2>
                                <p>V</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div >
                    <div className="container"> 
                    <div className="text-danger"><h2>Lanches Variados</h2></div>
                    <p></p>
                    <div id="demo1" className="collapse-show">
                        <div className="row">
                        {
                            this.state.feed.map(pr => ( 

                        <div className="col-md-3" key={pr._id}>
                            <div className="card">
                                <img src={"http://localhost:3333/files/" + pr.imagem} className="fotos"/>
                                <div className="card-body">
                                    <h4 className="card-title">{pr.nome}</h4>
                                    <p>Descrição:</p>
                                                <div className="form-group form-row">
                                                <select className="form-control col-md-2" id="sel1">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                    </select>
                                                </div>
                                            <h2>R$ {pr.preco.toLocaleString('pt-br',
                                                { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2><h6>cada</h6>
                                            <br />
                                            {pr.categorias.join(", ")}               
                                        </div>
                                        <div className="card-footer">
                                            <button type="button" className="btn btn-warning">
                                                <h5 className="text-dark">Adicionar</h5>
                                            </button>
                                        </div> 
                                    </div>                
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Lanchonete;