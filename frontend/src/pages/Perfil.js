import React, { Component, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import LoginContext from '../components/Context';
import Header from '../components/Header';

import '../services/api';

import './css/styles.css';

import api from '../services/api';//comunica com o backend

class Perfil extends Component {
    state = {
        email: '',
        senha: '',
        confirmarSenha: '',
        nome: '',
        erro: '',
        token: this.context.token
    };

    static contextType = LoginContext;

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = async e => {
        e.preventDefault();
        if(this.verificarSenha() === '') {
            const data = new URLSearchParams();
            data.append('senha', this.state.senha);
            data.append('nome', this.state.nome);
            const usuario = await api.put('/usuario/'+this.state.token+'/editar', data);
            const { setToken } = this.context;
            if(usuario.data){
                setToken(null);
                this.props.history.push('/');
            } else { this.setState({ erro: 'Os dados são inválidos' }) }
        }
        else this.setState({ erro: 'Senha inválida'});
    }

    verificarSenha = () => {
       if (this.state.senha.length > 5) {
           if (this.state.senha === this.state.confirmarSenha) {
               return '';
           }
       }
       else return 'A senha está errada';
    }

    async componentDidMount(){
        const response = await api.get('/usuario/'+this.state.token+'/perfil');
        this.setState({email:response.data.email, nome:response.data.nome});
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
                                        <h3 className="text-center" >Alterar informações de usuário</h3>
                                        <div className="form-group">
                                            <label htmlFor="email">E-mail:</label><br/>
                                            <input type="text" name="email" className="form-control"
                                            placeholder="email@exemplo.com"
                                            value={this.state.email} readOnly 
                                            />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor="nome">Nome:</label><br />
                                            <input type="text" name="nome" className="form-control"
                                                placeholder="Nome completo"
                                                onChange={this.handleChange} value={this.state.nome}
                                            />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor="password">Nova Senha:</label><br/>
                                            <input type="password" name="senha" className="form-control"
                                            minLength="6" placeholder="Mínino de 6 caracteres"
                                            onChange={this.handleChange} value={this.state.senha}
                                            required
                                            />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label htmlFor="confirmarSenha">Confirmar Senha:</label><br/>
                                            <input type="password" name="confirmarSenha" className="form-control"
                                            minLength="6" placeholder="Confirme sua senha"
                                            onChange={this.handleChange} value={this.state.confirmarSenha}
                                            required
                                            />
                                            <span className="text-danger">{this.state.confirmarSenha.length > 5 && this.verificarSenha()}</span>
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

export default withRouter(Perfil);