import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import './Feed.css';
import '../services/api';
import './css/bootstrap.min.css';
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
        const response = await api.get('posts');
        this.setState({feed: response.data});
    }


    handleLike = id => {
         api.post('/posts/'+id+"/like")
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

                                <div className="col-md-3 project-box a">
                                    <div className="card">
                                        <img src={geologia2} className="img-thumbnail"  alt="SMD" />
                                        <p></p>
                                        <div className="card-body">
                                            <h5 className="card-title" id="titulocartao">SMD</h5>

                                            <table className="table table-striped" >
                                                <thead>
                                                    <tr>
                                                        <th>Salgados</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Horário de Funcionamento <br/> 08:00 - 20:00</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Bloco 80 a 500m</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <button type="button" className="btn btn-success">
                                                <a className="text-white" href="lanchonete_a.html"><h5>entrar</h5></a>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default Home;