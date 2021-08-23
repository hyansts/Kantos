import React, { Component, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import LoginContext from '../components/Context';
import Header from '../components/Header';

import '../services/api';

import './css/styles.css';

import api from '../services/api';//comunica com o backend

class GerenciarPedidos extends Component {
    state = {
        feed: [],
        quantidade: [],
        produto: '',
        erro: '',
        token: this.context.token
    };

    static contextType = LoginContext;

    corStatus = (status) => {
        let otherClasses = "d-flex text-center form-group btn my-3";
        if (status === 'Esperando Confirmação') {
            return otherClasses+' btn-warning'
        } 
        if(status === 'Confirmado') {
            return otherClasses+' btn-primary'
        }
        if (status === 'Finalizado') {
            return otherClasses+' btn-dark'
        }
        return otherClasses;
    }

    solveStatus = (status) => {
        if (status === 'Esperando Confirmação') {
            return 'Confirmado'
        }
        if (status === 'Confirmado') {
            return 'Finalizado'
        }
        return 'Finalizado';
    }

    formaPagamento = (forma, troco) => {
        if(forma==='dinheiro') {
            if(troco) {
                return forma + ', Troco para: ' + troco;
            }
        }
        return forma;
    }

    formataData = data => {
       let dataObj = new Date(data);
       return dataObj.toLocaleString('pt-BR')
    }

    handleChange = (idx, e) => {
        //deep copy
        let qtd = this.state.quantidade.slice();
        qtd[idx] = Number(e.target.value);
        this.setState({ quantidade: qtd });
    }

    handleSubmit = async (id, status, idx) => {
        try {
            const data = new URLSearchParams();
            data.append('pedido_status', this.solveStatus(status));
            const venda = await api.put('/vendas/'+id+'/confirmar', data);
            let _feed = this.state.feed.slice();
            _feed[idx] = venda.data;
            this.setState({ feed: _feed }); 
        } catch(e) {
            this.setState({erro: 'Algo deu errado!'});
        }
    }

    async componentDidMount(){
        try {
            const usuario = await api.get('/usuario/' + this.state.token + '/perfil');
            const lanchonete = await api.get('/lanchonete/' + usuario.data.email + '/info');
            const pedidos = await api.get('/vendas/'+ lanchonete.data.nome_lanchonete);
            this.setState({ feed: pedidos.data })          
        }
        catch (e) { 
            this.setState({ erro: 'Nenhum pedido encontrado' });
        }
    }

    render(){
        return (
            <>
            <Header />
            <main>
                <div id="login">
                    <div className="container mt-5" >
                        <div id="login-row" className="row justify-content-center align-items-center">
                            <div id="login-column" className="col-md-6">
                                <div id="login-box" className="col-md-12">
                                    <form id="login-form" className="form">
                                            <div className="py-5 text-center">
                                                <h2>Pedidos dos Clientes</h2>
                                            </div>
                                        <h4 className="d-flex justify-content-between align-items-center mb-3 mt-3">
                                            <span>Lista de pedidos</span>
                                        </h4>
                                        <ul className="list-group mb-3">
                                        {   this.state.feed.map((pedido, idx) => (
                                            <li key={idx} className="list-group-item d-flex justify-content-between lh-sm row">
                                                <div className="col-md-8 mt-2">
                                                    { pedido.produtos.map((pr,index)=>(
                                                        <h6 key={'pedido'+index} className="my-1">
                                                            {pr.produto.nome} <small className="text-muted"> 
                                                             x {pr.quantidade} </small>
                                                         </h6>
                                                    ))}
                                                    <div>Horario de entrega: 
                                                        <small className="text-muted"> {pedido.horario_de_entrega? 
                                                            pedido.horario_de_entrega+' hrs': 'Agora'}
                                                        </small>
                                                    </div>
                                                    {
                                                    pedido.para_entrega && 
                                                    <div className="text-success">Local de entrega:
                                                        <small className="text-muted"> {pedido.endereco_de_entrega} </small>
                                                    </div>
                                                    || 
                                                    <div className="text-primary">Buscar no local</div>
                                                    }
                                                    <div>Forma de pagamento:
                                                        <small className="text-muted"> {this.formaPagamento(pedido.forma_de_pagamento, pedido.troco)} </small>
                                                    </div>
                                                    <div>Cliente:
                                                        <small className="text-muted"> {pedido.cliente.nome} </small>
                                                    </div>
                                                    <div>Total:
                                                        <small className="text-muted"> R${pedido.precoTotal.toLocaleString('pt-br',
                                                            {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2
                                                            })} 
                                                        </small>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    {pedido.pedido_status !== 'Finalizado' &&
                                                    <div className="d-flex justify-content-end form-group">
                                                        <button href="#" className="btn text-danger text-center">Cancelar</button>
                                                        <button className="btn btn-success mx-3"
                                                            onClick={(e) => this.handleSubmit(pedido._id, pedido.pedido_status, idx)}>
                                                            Confirmar
                                                        </button>
                                                    </div>
                                                    }
                                                    <div className={this.corStatus(pedido.pedido_status)}
                                                         style={{pointerEvents:'none'}}>
                                                        {pedido.pedido_status}
                                                    </div>
                                                </div>
                                            </li>
                                            ))}
                                        </ul>
                                        <h3 className="pt-3"></h3>
                                        <span className="text-danger">{this.state.erro}</span>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            </>
        );
    }
}

export default GerenciarPedidos;