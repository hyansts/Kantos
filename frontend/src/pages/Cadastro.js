import React, { Component, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import LoginContext from '../components/Context';
import Header from '../components/Header';

import '../services/api';

import './css/styles.css';

import api from '../services/api';//comunica com o backend

class Cadastro extends Component {
    state = {
        email: '',
        senha: '',
        confirmarSenha: '',
        nome: '',
        erro: '',
    };

    static contextType = LoginContext;

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = async e => {
        e.preventDefault();
        if(this.verificarSenha() === ''){
            const data = new URLSearchParams();
            data.append('email', this.state.email);
            data.append('senha', this.state.senha);
            data.append('nome', this.state.nome);
            const login = await api.post('/usuario', data);
            const {setToken} = this.context;
            if(login.data){
                setToken(login.data.id);
                this.props.history.push('/');
            } else { this.setState({ erro: 'Os dados são inválidos ou esse usuário já existe' }) }
        }
    }

    verificarSenha = () => {
       if (this.state.senha.length > 5) {
           if (this.state.senha === this.state.confirmarSenha) {
               return '';
           }
       }
       else return 'A senha está errada';
    }

    // async componentDidMount(){
    //     const id = this.props.location.state.lanchonete;
    //     const response = await api.get('produtos/'+id+'/lanchonete');
    //     this.setState({feed: response.data});
    // }

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
                                        <h3 className="text-center" >Cadastro de Usuário</h3>
                                        <div className="form-group">
                                            <label htmlFor="email">E-mail:</label><br/>
                                            <input type="text" name="email" className="form-control"
                                            placeholder="email@exemplo.com"
                                            onChange={this.handleChange} value={this.state.email}
                                            />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor="password">Senha:</label><br/>
                                            <input type="password" name="senha" className="form-control"
                                            minLength="6" placeholder="Mínino de 6 caracteres"
                                            onChange={this.handleChange} value={this.state.senha}
                                            />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor="confirmarSenha">Confirmar Senha:</label><br/>
                                            <input type="password" name="confirmarSenha" className="form-control"
                                            minLength="6" placeholder="Confirme sua senha"
                                            onChange={this.handleChange} value={this.state.confirmarSenha}
                                            />
                                            <span className="text-danger">{this.state.confirmarSenha.length > 5 && this.verificarSenha()}</span>
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor="nome">Nome:</label><br/>
                                            <input type="text" name="nome" className="form-control"
                                            placeholder="Nome completo"
                                            onChange={this.handleChange} value={this.state.nome}
                                            />
                                        </div>

                                        <h3 className="pt-3"></h3>
                                        <span className="text-danger">{this.state.erro}</span>
                                        <div className="row">
                                            <div className="col-md-12 row justify-content-center">
                                                <button type="submit" className="btn btn-success col-md-6">
                                                    <h6 className="text-white">Confirmar</h6>
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

export default Cadastro;