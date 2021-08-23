import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
//import './Feed.css';
import '../services/api';
import './css/styles.css';

import pici from '../assets/img/pici.jpg';
import banner from '../assets/img/logo192.png';

import io from 'socket.io-client';


//import more from "../assets/more.svg";
//import like from "../assets/like.svg";
//import comment from "../assets/comment.svg";
//import send from "../assets/send.svg";

import api from '../services/api';//comunica com o backend

class Home extends Component {
    state = {
        feed: [],
        produtos: [],
        categorias: [],
        filtro: '', 
    };

    handleChange = e => {
        this.setState({ filtro: e.target.value })
    }

    filtrar = async () => {
        const produtos = await api.post('/produtos/categorias', 
            {categoria: this.state.filtro});
        this.setState({ produtos: produtos.data });
    }

    async componentDidMount(){
        const response = await api.get('lanchonete');
        const produtos = await api.get('/produtos');
        let categorias = [];
        produtos.data.forEach(pr=>{
            pr.categorias.forEach((ct)=>{
                if(categorias.indexOf(ct) === -1) {
                    categorias.push(ct);
                }
            })
        })
        this.setState({feed: response.data});
        this.setState({produtos: produtos.data});
        this.setState({categorias: categorias});
    }

    render(){
        return (
            <>
            <Header />
            <main>
                <div className="container-fluid">
                    <div id="mainSlider" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#mainSlider" data-slide-to="0" className="active"></li>
                            <li data-target="#mainSlider" data-slide-to="1"></li>
                            <li data-target="#mainSlider" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={banner} className="d-block w-100" alt="Projetos de e-commerce" />
                            </div>
                        </div>        
                    </div>

                    <div id="lanchonetes-area">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <h2 className="main-title">Lanchonetes-Campus do Pici</h2>
                                </div>
                                {
                                    this.state.feed.map(lc => (

                                <div className="col-md-3 project-box a" key={lc._id}> 
                                    <div className="card">
                                        <img src={"http://localhost:3333/files/" + lc.imagem} className="fotos"  alt="Lanchonete" />
                                        <p></p>
                                        <div className="card-body">
                                            <h5 className="card-title" id="titulocartao">{lc.nome_lanchonete}</h5>

                                            <table className="table table-striped" >
                                                <thead>
                                                    <tr>
                                                        <th>{lc.endereco}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Horário de Funcionamento: <br/> {lc.horario}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Contato: {lc.contato}</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <Link to={{
                                                pathname: '/lanchonete',
                                                    state: {
                                                        lanchonete: lc.nome_lanchonete
                                                    }
                                                }}>
                                                <button type="button" className="btn btn-success">
                                                    <h5 className="text-white">Cardápio</h5>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                ))}      
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="row">
                            <h2 className="text-danger main-title mb-5 col-md-4">Escolha já o seu!</h2>
                            <div className="form-group col-md-6 mt-2">
                                <select className="form-select" 
                                 value={this.state.filtro} onChange={this.handleChange}>
                                    <option value=''> O que deseja?</option>
                                    {this.state.categorias.map(ct=>(                    
                                        <option key={ct} value={ct}>{ct}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-2 mb-5 mt-2">
                                <button className="btn btn-primary"
                                    onClick={this.filtrar}>Pesquisar
                                </button>
                            </div>
                        </div>
                        <div className="row">
                        { this.state.produtos.map((pr,idx) => (
                        <div className="col-md-3" key={pr._id}>
                            <div className="card mb-5">
                                <img src={"http://localhost:3333/files/" + pr.imagem} className="fotos" />
                                <div className="card-body">
                                    <h5 className="card-title mb-3">{pr.nome}</h5>
                                    <h2>R$ {pr.preco.toLocaleString('pt-br',
                                        { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2><h6>cada</h6>

                                    <small className="text-muted">Qtd em estoque: {pr.quantidade}</small><br />
                                    {pr.categorias.join(", ")}
                                </div>
                                <div className="card-footer row">
                                    <div className="col-md-12">
                                        <Link to={{
                                            pathname: '/lanchonete',
                                                state: {
                                                    lanchonete: pr.vendedor.nome_lanchonete
                                                }
                                            }}>
                                            <button type="button" className="btn btn-success">
                                                <h5 className="text-white">Ir à lanchonete</h5>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                        </div>
                    </div>
                </div>
            </main>
            </>
        );
    }
}

export default Home;