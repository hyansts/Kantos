import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Header from '../components/Header';

import '../services/api';

import './css/styles.css';
import pici from '../assets/img/banner1.png';
import cart from '../assets/img/cart-arrow-down-solid.svg';

import api from '../services/api';//comunica com o backend

class Lanchonete extends Component {
    state = {
        feed: [],
        showCarrinho: false,
        carrinho: [], 
    };

    async componentDidMount(){
        const id = this.props.location.state.lanchonete;
        const response = await api.get('produtos/'+id+'/lanchonete');
        this.setState({feed: response.data});
    }

    handleShowCarrinho = () => {
        this.setState({showCarrinho: true});
    }
    handleHideCarrinho = () => {
        this.setState({ showCarrinho: false });
    }

    addToCarrinho = (produto) => {
        this.setState({carrinho: produto});
    }

    render(){
        return (
            <>
            <Header />
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
                    <div className="text-danger"><h2>Cardápio de Lanches Variados</h2></div>
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
                                            <small className="text-muted">Qtd em estoque:{pr.quantidade}</small><br/>
                                            {pr.categorias.join(", ")}               
                                        </div>
                                        <div className="card-footer">
                                            <button type="button" className="btn btn-warning" onClick={this.addToCarrinho}>
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
                <div className="p-2 bd-highlight carrinho">
                    <button type="button" className="btn btn-info" onClick={this.handleShowCarrinho}>
                        <img src={cart}/>
                        <h6 className="text-white my-2">Carrinho</h6>
                    </button>
                </div>
            </main>

            <Modal show={this.state.showCarrinho} onHide={this.handleHideCarrinho}> 
                <Modal.Header>
                    <Modal.Title>Carrinho de Compras</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="col-lg-12 order-md-last" >  
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">Seus produtos</span>
                            <span className="badge bg-secondary rounded-pill">3</span>
                        </h4>
                        <ul className="list-group mb-3">
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                                <h6 className="my-0">Nome do Produto</h6>
                                <small className="text-muted">Descrição breve</small>
                            </div>
                            <span className="text-muted">R$12</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                                <h6 className="my-0">Segundo produto</h6>
                                <small className="text-muted">Descrição breve</small>
                            </div>
                            <span className="text-muted">R$8</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                                <h6 className="my-0">Terceiro item</h6>
                                <small className="text-muted">Descrição breve</small>
                            </div>
                            <span className="text-muted">R$5</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between bg-light">
                            <div className="text-success">
                                <h6 className="my-0">Total</h6>
                            </div>
                            <strong className="text-success">R$20</strong>
                            </li>
                        </ul>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleHideCarrinho}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={this.handleHideCarrinho}>
                        Comprar
                    </Button>
                </Modal.Footer>
            </Modal>
            </>
        );
    }
}

export default Lanchonete;