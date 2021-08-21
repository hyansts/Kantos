import React, { Component, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import LoginContext from '../components/Context';
import Header from '../components/Header';

import '../services/api';

import './css/styles.css';

import api from '../services/api';//comunica com o backend

class CadastroProduto extends Component {
    state = {
        nome: '',
        preco: 0,
        quantidade: 0,
        categorias: '',
        image: '',
        token: this.context.token,
        inválido: '',
    };

    static contextType = LoginContext;

    handleImageChange = e => {
        this.setState({ image: e.target.files[0] });
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = async e => {
        e.preventDefault();
        let usuario = await api.get('/usuario/' + this.state.token + '/perfil');
        const lanchonete = await api.get('/lanchonete/' + usuario.data.email + '/info');
        console.log(lanchonete.data);
        if (lanchonete.data){
            const data = new FormData();
            data.append('nome', this.state.nome);
            data.append('preco', this.state.preco);
            data.append('quantidade', this.state.quantidade);
            data.append('categorias', this.state.categorias);
            data.append('image', this.state.image);
            data.append('vendedor_nome_lanchonete', 
                lanchonete.data.nome_lanchonete);
            data.append('vendedor_endereco',
                lanchonete.data.endereco);
            data.append('vendedor_horario',
                lanchonete.data.horario);
            data.append('vendedor_contato',
                lanchonete.data.contato);
            console.log(this.state.image);
            const produto = await api.post('/produtos', data);
            if(produto.data) {
                this.props.history.push('/');
            } else this.setState({ invalido: 'Não foi possível adicionar o produto' })
        }
        else this.setState({invalido: 'Este usuário não tem permissão para realizar essa ação.'})
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
                                    <form id="login-form" className="form" onSubmit={this.handleSubmit}>                        
                                        <div className="col-md-12 mt-3">
                                            <h2 className="text-center">Cadastro de produto</h2>              
                                            <div className="col-md-12">
                                                <label htmlFor="nome" className="form-label">Nome do produto</label>
                                                <input type="text" className="form-control"
                                                    placeholder="Que produto deseja adicionar?" required
                                                    name="nome" onChange={this.handleChange} value={this.state.nome} />
                                            </div>
                                            <div className="col-md-12 mt-3">
                                                <label htmlFor="categorias" className="form-label">Categorias</label>
                                                <input type="text" className="form-control"
                                                    placeholder="Ex: Massa Salgado Sobremesa" required
                                                    name="categorias" onChange={this.handleChange} value={this.state.categorias} />
                                                <small className="text-muted">* separe as categorias com um espaço.</small>    
                                            </div>
                                            <div className="col-md-12 mt-3">
                                                <label>Imagem do produto:</label><br />
                                                <input type="file" className="form-control"
                                                    onChange={this.handleImageChange} required
                                                />
                                            </div>
                                            <div className="col-md-12 mt-3">
                                                    <label htmlFor="preco" className="form-label">Preço: 
                                                    <small className="text-muted"> Quanto custa?</small></label>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">R$</span>
                                                    </div>
                                                    <input type="number" min="0" step="0.01"
                                                        className="form-control" required
                                                        name="preco" onChange={this.handleChange} value={this.state.preco} />  
                                                </div>
                                                
                                            </div>
                                            <div className="col-md-12 mt-3">
                                                <label htmlFor="quantidade" className="form-label">Quantidade: 
                                                <small className="text-muted"> Quantas unidades em estoque?</small></label>
                                                <input type="number" min="0" step="1"
                                                        className="form-control" required
                                                        name="quantidade" onChange={this.handleChange} value={this.state.quantidade} />
                                            </div>    
                                        </div>
                                        <h3 className="pt-3"></h3>
                                        <span className="text-danger">{this.state.invalido}</span>
                                        <div className="row mt-4">
                                            <div className="col-md-12 row justify-content-center">
                                                <button type="submit" className="btn btn-success col-md-12">
                                                    <h6 className="text-white">Confirmar Cadastro</h6>
                                                </button>
                                            </div>
                                        </div>
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

export default withRouter(CadastroProduto);