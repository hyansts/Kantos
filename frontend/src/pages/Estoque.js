import React, { Component, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import LoginContext from '../components/Context';
import Header from '../components/Header';

import '../services/api';

import './css/styles.css';

import api from '../services/api';//comunica com o backend

class Estoque extends Component {
    state = {
        feed: [],
        quantidade: [],
        produto: '',
        erro: '',
        token: this.context.token
    };

    static contextType = LoginContext;

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
            const usuario = await api.get('/usuario/' + this.state.token + '/perfil');
            const lanchonete = await api.get('/lanchonete/' + usuario.data.email + '/info');
            const response = await api.get('produtos/'+lanchonete.data.nome_lanchonete+'/lanchonete');
            this.setState({feed: response.data}, ()=> {
                let qtd = [];
                this.state.feed.map(pr => {
                    qtd.push(pr.quantidade);
                });
                this.setState({ quantidade: qtd });
            });
        }
        catch (e) { 
            this.setState({ erro: 'Não foi possível acessar os produtos' });
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
                                                <h2>Gerenciamento de estoque</h2>
                                            </div>
                                        <h4 className="d-flex justify-content-between align-items-center mb-3 mt-3">
                                            <span>Lista de produtos</span>
                                        </h4>
                                        <ul className="list-group mb-3">
                                        {   this.state.feed.map((pr, idx) => (
                                            <li key={pr.nome} className="list-group-item d-flex justify-content-between lh-sm row">
                                                <div className="col-md-4">
                                                    <img src={"http://localhost:3333/files/" + pr.imagem} className="fotos-mini"/>
                                                </div>
                                                <div className="col-md-3 mt-1">
                                                    <h6 className="my-0">{pr.nome}</h6>
                                                    <span>Em estoque: {pr.quantidade}</span>
                                                </div>
                                                <div className="d-flex justify-content-end col-md-5 form-group">
                                                    <input type="number" min="0" step="1" name="quantidade"
                                                    defaultValue={pr.quantidade} onChange={(e) => this.handleChange(idx, e)}
                                                    className="form-control"/>
                                                    <input type="submit" name="submit" 
                                                        className="btn btn-success btn-md" value="Alterar" 
                                                        onClick={(e) => this.handleSubmit(idx, e)} />
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

export default Estoque;