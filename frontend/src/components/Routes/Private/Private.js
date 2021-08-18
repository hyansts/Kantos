import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import LoginContext from '../../Context';

const RoutesPrivates = ({component: Component, ...rest}) => {
  const {token} = useContext(LoginContext);
  return (
    <Route {...rest} render={() => token 
      ? <Component {...rest}/>
      : <Redirect to='/login'/>
    }
    />
  )
}

export default RoutesPrivates;