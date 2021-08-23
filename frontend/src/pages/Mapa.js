import React, { Component, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import LoginContext from '../components/Context';
import Header from '../components/Header';

import '../services/api';

import './css/styles.css';

import mapa from '../assets/img/Mapa_Pici.png';

class Mapa extends Component {

    render(){
        return (
            <>
            <Header />
            <main>
                <img src={mapa} className="w-100 mt-5"/>
            </main>
            </>
        );
    }
}

export default Mapa;