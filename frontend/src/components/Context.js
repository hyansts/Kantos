import { createContext } from 'react';

const LoginContext = createContext({
  token: null,
  setToken: () => {},
})

export default LoginContext;