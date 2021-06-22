import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import api from '../../services/api';

//Components
import NavBar from "./NavBar/index"
import Sorteios from "./Sorteios/index";
import MeusSorteios from "./MeusSorteios/index";
import Perfil from "./Perfil/index";
import Loading from "../Loading/index";

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
        }).then(response => {
            const { data } = response
            setDraws(data.draws)
            setUser(data.user)
            setMyDraws(data.user.tickets)
            setLoad(false)
        }).catch(error => {
            console.log(error)
            if (!error.response) return alert('Ocorreu algum erro. Tente novamente mais tarde!');
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                alert('Você será redirecionado');
                window.location.href = "/entrar";
                return;
            }
            alert('Serviço indisponível no momento')
        })
    }, []);

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
            <NavBar onButtonClick={setIndex} />
            <div className='container'>
                <div className='row justify-content-center row-cols-auto text-dark'>
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