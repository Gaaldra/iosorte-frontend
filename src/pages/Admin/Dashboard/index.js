import React, { useEffect, useState } from 'react';
import api from "../../../services/api";
import Loading from "../../Loading/index";
import countDown from "../../../utils/countDown";
import { Link } from 'react-router-dom';

function Dashboard() {
    const [draws, setDraws] = useState([]);
    const [games, setGames] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        api.get("/secret/dashboard", {
            headers: {
                "authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response => {
            const data = response.data
            setDraws(data.draws)
            setGames(data.games)
            setLoad(false)
        }).catch(error => {
            if (!error.response) return alert("Ocorreu algum problema");
            if (error.response.status === 401) {
                localStorage.removeItem("token")
                alert("Você será redirecionado");
                window.location.href = ""
            }
        })
    }, [])

    if (load) return <Loading />

    return (
        <div className="accordion text-dark" id="accordionMain">
            <div className="accordion-item">
                <h2 className="accordion-header" id='headingOne'>
                    <button className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="false"
                        aria-controls="collapseOne">
                        Sorteios
                    </button>
                </h2>
                <div className="accordion-collapse collapse" id="collapseOne" aria-labelledby="headingOne" data-bs-parent="#accordionMain">
                    <div className="accordion-body">
                        <button className="btn btn-success" onClick={() => window.location.replace('./add-draw')}><i className="fas fa-plus"></i></button>
                        <div className="row justify-content-around">
                            {draws.map(draw => {
                                return (
                                  <Draw draw={draw} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id='headingTwo'>
                    <button className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo">
                        Games
                    </button>
                </h2>
                <div className="accordion-collapse collapse" id="collapseTwo" aria-labelledby="headingTwo" data-bs-parent="#accordionMain">
                    <div className="accordion-body">
                        <button className="btn btn-success" onClick={() => window.location.replace('./add-game')}><i className="fas fa-plus"></i></button>
                        <div className="row justify-content-around">
                            {games.map(game => {
                                return (
                                    <div key={game._id} className='col my-2'>
                                        <div className='card border-success' style={{ width: '18rem', padding: 0 }}>
                                            <img src={game.urlImage} className='card-img-top' alt='Jogo' />
                                            <div className="card-body text-center">
                                                <h5 className='card-title'>{game.name}</h5>
                                                <p className='card-text'>{game.description}</p>
                                                <Link to='/adm/add-game' className='btn btn-success btn-lg'>Modificar</Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;

function Draw({ draw }) {

    const [timeLeft, setTimeLeft] = useState(countDown(draw.drawDate));

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(countDown(draw.drawDate));
        }, 1000);
    });

    return (
        <div key={draw._id} className='col my-2'>
            <div className='card border-success' style={{ width: '18rem', padding: 0 }}>
                <img src={draw.game.urlImage} className='card-img-top' alt='Jogo' />
                <div className="card-body text-center">
                    <h5 className='card-title'>{draw.award}</h5>
                    <p className='card-text'>{draw.game.name}</p>
                    {draw.active && <>
                        <button className='btn btn-success btn-lg'>Sortear</button>
                        <p className='card-text text-muted'>{timeLeft}</p>
                    </>}
                    {!draw.active && <>
                        <p className='card-text text-muted'>Ganhador: {draw.winner.name}</p>
                    </>}
                </div>
            </div>
        </div>
    )
}