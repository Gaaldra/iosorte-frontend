import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

//Components
import NavBar from './components/NavBar/index.jsx'
import Sorteios from './components/Sorteios/index.jsx';
import MeusSorteios from './components/MeusSorteios/index.jsx';
import Perfil from './components/Perfil/index.jsx';

function Dashboard() {

    const pages = {
        0: <Sorteios />,
        1: <MeusSorteios />,
        2: <Perfil />,
        3: sair()
    }

    const [index, setIndex] = useState(0)

    return (
        <>
            <div className='container'>
                <NavBar onButtonClick={setIndex} />
                <div className='row justify-content-around row-cols-auto'>
                    {pages[index]}
                </div>
            </div>
        </>
    )
}

export default Dashboard;

function sair() {
    
    return (
        <Redirect to='/' />
    )
}