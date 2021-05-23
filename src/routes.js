import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//Componentes
import Login from './views/login';
import Cadastro from './views/cadastro';
import Loading from './views/loading';
import Dashboard from './views/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/cadastrar' component={Cadastro} />
        <Route path='/loading' component={Loading} />
        <Route path='/dashboard' component={Dashboard} />
      </Switch>
    </BrowserRouter>
  )
};

export default App;
