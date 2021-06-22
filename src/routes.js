import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//Componentes
import Home from "./pages/Home/index";
import Login from "./pages/Login/index";
import Cadastro from "./pages/SignUp/index";
import Dashboard from "./pages/Dashboard/index.js";
import ForgotPassword from './pages/ForgotPassword/index';
import LoginAdmin from "./pages/Admin/Login/index";
import DashboardAdmin from "./pages/Admin/Dashboard/index";
import AddDraw from "./pages/Admin/AddDraw/index";
import AddGame from "./pages/Admin/AddGame/index";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path='/entrar' component={Login} />
        <Route path='/cadastrar' component={Cadastro} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/forgot-password' component={ForgotPassword} />
        <Route path="/adm" exact component={LoginAdmin}/>
        <Route path="/adm/dashboard" exact component={DashboardAdmin}/>
        <Route path="/adm/add-draw" exact component={AddDraw}/>
        <Route path="/adm/add-game" exact component={AddGame}/>
      </Switch>
    </BrowserRouter>
  )
};

export default App;
