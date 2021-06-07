import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//Componentes
import Home from './views/home/index';
import Login from './views/login';
import Cadastro from './views/cadastro';
import Dashboard from './views/dashboard';
import Portal from './views/admin/portal';
import AdmDashboard from './views/admin/dashboard';
import AddDraw from './views/admin/draw';
import AddGame from './views/admin/game';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path='/entrar' component={Login} />
        <Route path='/cadastrar' component={Cadastro} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path="/adm" exact component={Portal}/>
        <Route path="/adm/dashboard" exact component={AdmDashboard}/>
        <Route path="/adm/add-draw" exact component={AddDraw}/>
        <Route path="/adm/add-game" exact component={AddGame}/>
      </Switch>
    </BrowserRouter>
  )
};

export default App;
