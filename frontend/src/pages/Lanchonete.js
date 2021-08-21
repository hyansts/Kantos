import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Header from '../components/Header';

import '../services/api';

import './css/styles.css';
import pici from '../assets/img/banner1.png';
import cart from '../assets/img/cart-arrow-down-solid.svg';
import cartBlack from '../assets/img/cart-arrow-down-solid-black.svg';
import trash from '../assets/img/trash-alt-solid.svg';

import api from '../services/api';//comunica com o backend

class Lanchonete extends Component {
    state = {
        feed: [],
        showCarrinho: false,
        telaComprar: false,
        carrinho: [],
        troco: 0,
        endereco: '',
        horario: '',
        para_entrega: 'false',
        forma_de_pagamento: 'dinheiro',
    };

    async componentDidMount(){
        const id = this.props.location.state.lanchonete;
        const response = await api.get('produtos/'+id+'/lanchonete');
        this.setState({feed: response.data});
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleShowCarrinho = () => {
        this.setState({ telaComprar: false });
        this.setState({showCarrinho: true});
    }
    handleHideCarrinho = () => {
        this.setState({ showCarrinho: false });
        this.setState({ telaComprar: false });
    }

    handleShowComprar = () => {
        this.setState({ telaComprar: true });
    }
    handleHideComprar = () => {
        this.setState({ telaComprar: false });
    }

    findWithAttr(array, attr, value) {
        for (var i = 0; i < array.length; i += 1) {
            if (array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }

    addToCarrinho = (produto_idx) => {
        let _carrinho = this.state.carrinho;
        let itemIdx = this.findWithAttr(_carrinho, 'idx', produto_idx);
        if (itemIdx > -1 && _carrinho[itemIdx]) {
            if (this.state.feed[produto_idx].quantidade > _carrinho[itemIdx].qtd) {
                _carrinho[itemIdx] =
                { idx: produto_idx, qtd: _carrinho[itemIdx].qtd + 1 }
            }
        } else {
            _carrinho.push({idx: produto_idx, qtd: 1});
        }
        
        this.setState({carrinho: _carrinho});
    }

    removeFromCarrinho = (produto_idx) => {
        let _carrinho = this.state.carrinho;
        let itemIdx = this.findWithAttr(_carrinho, 'idx', produto_idx);
        if (itemIdx > -1 && _carrinho[itemIdx]) {
            _carrinho.splice(itemIdx,1);
        } else { return }
        this.setState({ carrinho: _carrinho });
    }

    formataPreco(preco, qtd) {
        let total = preco*qtd;
        return total.toLocaleString('pt-br',
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })
    }

    formataPrecoTotal() {
        let total = 0;
        this.state.carrinho.map(pr=>{
           total += this.state.feed[pr.idx].preco*pr.qtd
        });

        return total.toLocaleString('pt-br',
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })
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
                            this.state.feed.map((pr,idx) => ( 

                        <div className="col-md-3" key={pr._id}>
                            <div className="card mb-5">
                                <img src={"http://localhost:3333/files/" + pr.imagem} className="fotos"/>
                                <div className="card-body">
                                    <h4 className="card-title mb-3">{pr.nome}</h4>
                                        <h2>R$ {pr.preco.toLocaleString('pt-br',
                                            { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2><h6>cada</h6>
                                        
                                        <small className="text-muted">Qtd em estoque: {pr.quantidade}</small><br/>
                                        {pr.categorias.join(", ")}               
                                </div>
                                    <div className="card-footer row">
                                        <button type="button" className="btn btn-warning col-md-6" onClick={() => this.addToCarrinho(idx)}>
                                                <h6 className="text-dark">
                                                    Adicionar {' '}
                                                    <img src={cartBlack} className="card-icone" />
                                                </h6>
                                        </button>
                                        <div className="col-md-6">
                                            <input type="number" className="form-control" style={{textAlign: 'center'}}
                                            value = {
                                                this.state.carrinho[this.findWithAttr(this.state.carrinho, 'idx', idx)]?.qtd
                                                || 0
                                                } readOnly/>
                                                <button type="button" className="btn btn-dark form-control" 
                                                onClick={() => this.removeFromCarrinho(idx)}>
                                                    <h5 className="text-white">
                                                        <img src={trash} className="card-icone"/>
                                                    </h5>
                                                </button>
                                        </div>
                                    </div> 
                            </div>                
                        </div>
                                ))}
                        </div>
                    </div>
                </div>
                </div>
                <div className="p-2 bd-highlight carrinho">
                    <button type="button" className="btn btn-danger" onClick={this.handleShowCarrinho}>
                        <img src={cart} className="img-carrinho"/>
                        <h6 className="text-white my-2 text-carrinho">Carrinho</h6>
                    </button>
                </div>
            </main>

            <Modal show={this.state.showCarrinho} onHide={this.handleHideCarrinho}> 
                <Modal.Header>
                    <Modal.Title>
                        {
                        !this.state.telaComprar && <span>Carrinho de Compras</span>
                        || <span>Finalizar Compra</span>
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { !this.state.telaComprar && 
                    <div className="col-lg-12 order-md-last" >  
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">Seus produtos</span>
                            <span className="badge bg-secondary rounded-pill">
                                {this.state.carrinho.length}
                            </span>
                        </h4>
                        <ul className="list-group mb-3">
                            {this.state.carrinho.map(pr => (
                            <li key={pr.idx} className="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                                <h6 className="my-0">{this.state.feed[pr.idx].nome}</h6>
                                <small className="text-muted">quantidade: {pr.qtd}</small>
                            </div>
                            <span className="text-muted">
                                R$ {this.formataPreco(this.state.feed[pr.idx].preco, pr.qtd)}
                            </span>
                            </li>
                            ))}
                            <li className="list-group-item d-flex justify-content-between bg-light">
                            <div className="text-success">
                                <h6 className="my-0">Total</h6>
                            </div>
                            <strong className="text-success">R$ {this.formataPrecoTotal()}</strong>
                            </li>
                        </ul>
                    </div>
                    || 
                    <div className="col-md-12">
                        <h4 className="mb-3">Opções do pedido</h4>
                        <div className="row gy-3"> 
                            <div className="col-md-6">
                                <label htmlFor="state" className="form-label">Forma de Pagamento</label>
                                <div className="form-check">
                                    <input name="forma_de_pagamento" onChange={this.handleChange}
                                    type="radio" className="form-check-input" 
                                    checked={this.state.forma_de_pagamento === 'dinheiro'} value="dinheiro" />
                                    <label className="form-check-label" htmlFor="dinheiro">Dinheiro</label>
                                </div>
                                <div className="form-check">
                                    <input name="forma_de_pagamento" onChange={this.handleChange}
                                    type="radio" className="form-check-input" 
                                    checked={this.state.forma_de_pagamento === 'cartao'} value="cartao" />
                                    <label className="form-check-label" htmlFor="cartao">Cartão</label>
                                </div>
                                <div className="form-check">
                                    <input name="forma_de_pagamento" onChange={this.handleChange}
                                    type="radio" className="form-check-input" 
                                    checked={this.state.forma_de_pagamento === 'pix'} value="pix" />
                                    <label className="form-check-label" htmlFor="pix">Pix</label>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Modalidade</label>
                                <div className="form-check">
                                    <input type="radio" onChange={this.handleChange}
                                    className="form-check-input" checked={this.state.para_entrega === 'false'}
                                    name="para_entrega" value="false"/>
                                    <label className="form-check-label" htmlFor="local">Retirada no local</label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" onChange={this.handleChange}
                                    className="form-check-input" checked={this.state.para_entrega === 'true'}
                                    name="para_entrega" value="true"/>
                                    <label className="form-check-label" htmlFor="delivery">Delivery</label>
                                </div>
                            </div>       
                        </div>

                        <div className="my-4"></div>

                        <div className="row gy-3">                         
                            <div className="col-md-12">
                                <label htmlFor="troco" className="form-label">Troco</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">R$</span>
                                    </div>
                                    <input type="number" min="0" max="200" step="1" 
                                    className="form-control" id="troco" placeholder="Troco para quanto?"
                                    name="troco" onChange={this.handleChange} value={this.state.troco} />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="endereco" className="form-label">Local de Entrega</label>
                                <input type="text" className="form-control" 
                                id="endereco" placeholder="Aonde vai ser entregue?" 
                                name="endereco" onChange={this.handleChange} value={this.state.endereco} />
                            </div>
                        </div>
                        <div className="row gy-3">
                            <div className="col-md-12">
                                <label htmlFor="horario" className="form-label"><br/>Horário agendado</label>
                                <input className="form-select" id="horario" 
                                type="time" min="08:00" max="20:00" 
                                name="horario" onChange={this.handleChange} value={this.state.horario}/>

                            </div>
                        </div>
                    </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleHideCarrinho}>
                        Fechar
                    </Button>
                    {
                    this.state.carrinho.length>0 && !this.state.telaComprar &&
                    <Button variant="primary" onClick={this.handleShowComprar}>
                        Comprar
                    </Button>
                    || this.state.carrinho.length>0 && this.state.telaComprar &&
                    <Button variant="warning text-black" >
                        Finalizar Compra
                    </Button>
                    }
                </Modal.Footer>
            </Modal>
            </>
        );
    }
}

export default Lanchonete;