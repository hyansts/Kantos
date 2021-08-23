import React from 'react';
//importa a biblioteca para lidar com rotas no react
import { Switch, Route } from 'react-router-dom';

import Feed from './pages/Feed';
import Login from './pages/Login';
import Home from './pages/Home';
import Lanchonete from './pages/Lanchonete';
import Cadastro from './pages/Cadastro';
import LoginLanchonete from './pages/LoginLanchonete';
import CadastroLanchonete from './pages/CadastroLanchonete';
import CadastroProduto from './pages/CadastroProduto';
import Perfil from './pages/Perfil';
import Estoque from './pages/Estoque';
import MeusPedidos from './pages/MeusPedidos';
import GerenciarPedidos from './pages/GerenciarPedidos';
import Mapa from './pages/Mapa';
import RelatorioVendas from './pages/RelatorioVendas';
import RoutesPrivate from './components/Routes/Private/Private';

function Routes() {
    return(
        <Switch>
            <Route path="/" exact component={Home}/>
            <RoutesPrivate path="/lanchonete" component={Lanchonete} />
            <Route path="/login" component={Login} />
            <Route path="/cadastro" component={Cadastro} />
            <Route path="/loginLanchonete" component={LoginLanchonete} />
            <Route path="/cadastroLanchonete" component={CadastroLanchonete} />
            <Route path="/mapa" component={Mapa} />
            <RoutesPrivate path="/produto" component={CadastroProduto} />
            <RoutesPrivate path="/perfil" component={Perfil} />
            <RoutesPrivate path="/estoque" component={Estoque} />
            <RoutesPrivate path="/relatorioVendas" component={RelatorioVendas} />
            <RoutesPrivate path="/meusPedidos" component={MeusPedidos} />
            <RoutesPrivate path="/gerenciarPedidos" component={GerenciarPedidos} />
        </Switch>
    );
}

export default Routes;