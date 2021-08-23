import React, { Component, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import LoginContext from '../components/Context';
import Header from '../components/Header';

import '../services/api';

import './css/styles.css';

import api from '../services/api';//comunica com o backend

class MeusPedidos extends Component {
    state = {
        feed: [],
        quantidade: [],
        produto: '',
        erro: '',
        token: this.context.token
    };

    static contextType = LoginContext;

    corStatus = (status) => {
        let otherClasses = 'btn';
        if (status === 'Esperando Confirmação') {
            return otherClasses + ' text-warning'
        }
        if (status === 'Confirmado') {
            return otherClasses + ' text-primary'
        }
        if (status === 'Finalizado') {
            return otherClasses + ' text-success'
        }
        return otherClasses;
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

    handleSubmit = async (idx, e) => {
        e.preventDefault();
        try {
            const data = new URLSearchParams();
            data.append('quantidade', this.state.quantidade[idx]);
            const estoque = await api.put('/produtos/'+this.state.feed[idx]._id+'/estoque', data);
            let newFeed = this.state.feed.slice();
            newFeed[idx] = estoque.data;
            this.setState({feed: newFeed});
        } catch(e) {
            this.setState({erro: 'Algo deu errado!'});
        }
    }

    async componentDidMount(){
        try {
            const pedidos = await api.get('/vendas/'+ this.state.token +'/meusPedidos');
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
                                                <h2>Meus Pedidos</h2>
                                            </div>
                                        <h4 className="d-flex justify-content-between align-items-center mb-3 mt-3">
                                            <span>Lista de pedidos</span>
                                        </h4>
                                        <ul className="list-group mb-3">
                                        {   this.state.feed.map((pedido, idx) => (
                                            <li key={idx} className="list-group-item d-flex justify-content-between lh-sm row">
                                                <div className="col-md-6 mt-1">
                                                    { pedido.produtos.map((pr,index)=>(
                                                        <h6 key={'pedido'+index} className="my-1">
                                                            {pr.produto.nome} <small className="text-muted"> 
                                                             x {pr.quantidade} </small>
                                                         </h6>
                                                    ))}
                                                    <div>Data: 
                                                        <small className="text-muted"> {this.formataData(pedido.createdAt)} </small>
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
                                                <div className="d-flex justify-content-end col-md-6 form-group">
                                                    {pedido.pedido_status==='Esperando Confirmação' &&
                                                    <a href="#" className="btn text-center text-danger">Cancelar</a>}
                                                    <div className={this.corStatus(pedido.pedido_status)} style={{pointerEvents:'none'}}>{pedido.pedido_status}</div>
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

export default MeusPedidos;