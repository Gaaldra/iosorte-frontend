import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//Componentes
import Login from './views/login';
import Cadastro from './views/cadastro';
import Loading from './views/loading';
import Dashboard from './views/dashboard';
import Portal from './views/admin/portal';
import AdmDashboard from './views/admin/dashboard';
import AddDraw from './views/admin/draw';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/cadastrar' component={Cadastro} />
        <Route path='/loading' component={Loading} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path="/adm" exact component={Portal}/>
        <Route path="/adm/dashboard" exact component={AdmDashboard}/>
        <Route path="/adm/add-draw" exact component={AddDraw}/>
      </Switch>
    </BrowserRouter>
  )
};

export default App;
