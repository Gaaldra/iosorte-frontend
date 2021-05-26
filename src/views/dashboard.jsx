import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../services/api.js';

//Components
import NavBar from './components/NavBar/index.jsx'
import Sorteios from './components/Sorteios/index.jsx';
import MeusSorteios from './components/MeusSorteios/index.jsx';
import Perfil from './components/Perfil/index.jsx';
import Loading from './loading.jsx';

function Dashboard() {

    const [user, setUser] = useState({});
    const [draws, setDraws] = useState([]);
    const [myDraws, setMyDraws] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        api.get('/draw/', {
            headers: {
                "authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(data => {
                setDraws(data.data.draws);
                setLoad(false)
            })
            .catch(error => {
                if (!error.response) return alert('Oh no. Parece que algo deu erro. Tenta novamente mais tarde.')
                alert('Você será redirecionado')
                if (error.response.status === 401) return window.location.href = '/'
            });
    }, []);

    useEffect(() => {
        api.get('/draw/my-draws/', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(data => {
                setMyDraws(data.data.user.tickets);
                setUser(data.data.user)
                setLoad(false)
            })
            .catch(error => {
                if (!error.response) return window.location.href = '/'
                if (error.response.status === 401) return window.location.href = '/'
            });
    }, [draws])

    const pages = {
        0: <Sorteios sorteios={draws} setSorteios={setDraws} setMyDraws={setMyDraws} />,
        1: <MeusSorteios sorteios={myDraws} />,
        2: <Perfil user={user} />,
        3: sair()
    }

    const [index, setIndex] = useState(0)

    if (load) return <Loading />

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