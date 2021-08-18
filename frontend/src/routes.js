import React from 'react';
//importa a biblioteca para lidar com rotas no react
import { Switch, Route } from 'react-router-dom';

import Feed from './pages/Feed';
import Login from './pages/Login';
import Home from './pages/Home';
import Lanchonete from './pages/Lanchonete';
import Comments from './pages/Comments';
import RoutesPrivate from './components/Routes/Private/Private';

function Routes() {
    return(
        <Switch>
            <Route path="/" exact component={Home}/>
            <RoutesPrivate path="/lanchonete" component={Lanchonete} />
            <Route path="/login" component={Login} />
        </Switch>
    );
}

export default Routes;