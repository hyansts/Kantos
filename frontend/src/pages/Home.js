import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import './Feed.css';
import '../services/api';
import './css/styles.css';

import pici from '../assets/img/pici.jpg';
import geologia2 from '../assets/img/geologia2.jpg';

import io from 'socket.io-client';


//import more from "../assets/more.svg";
//import like from "../assets/like.svg";
//import comment from "../assets/comment.svg";
//import send from "../assets/send.svg";

import api from '../services/api';//comunica com o backend

class Home extends Component {
    state = {
        feed: [], 
    };

    async componentDidMount(){
        const response = await api.get('lanchonete');
        this.setState({feed: response.data});
    }

    render(){
        return (
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
                                <img src={pici} className="d-block w-100" alt="Projetos de e-commerce" />
                                <div className="carousel-caption d-md-block">
                                    <h2>Seu Pedido de lanche na UFC, do seu jeito, na hora certa, em qualquer lugar do Campus do Pici!</h2>                        
                                    <p>V</p>   
                                </div>
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
                                        <img src={"http://localhost:3333/files/" + lc.imagem} className="img-thumbnail"  alt="Lanchonete" />
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
                </div>
            </main>
        );
    }
}

export default Home;