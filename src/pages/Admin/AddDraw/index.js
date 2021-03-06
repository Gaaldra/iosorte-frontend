import React, { useEffect, useState } from 'react';
import api from "../../../services/api";
import moment from 'moment';

function Draw() {
    const [award, setAward] = useState("")
    const [date, setDate] = useState(moment().hour(23).minutes(59).format('YYYY-MM-DDTHH:mm'))
    const [game, setGame] = useState("")
    const [options, setOptions] = useState([])

    useEffect(() => {
        api.get('/secret/dashboard', {
            headers: {
                "authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(result => setOptions(result.data.games)).catch(error => alert(error))
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        if (!game) return alert('Selecione o jogo');
        if (!award) return alert('Falta um premio');
        if (!date) return alert('Selecione a data');
        api.post('/secret/add-draw', {
            game: game,
            award: award,
            drawDate: date
        },{ 
            headers: { 
                "authorization": `Bearer ${localStorage.getItem('token')}` 
            } 
        }).then(result => window.location.href = "./dashboard").catch(error => alert(error))
    }

    return (
        <div className="container box">
            <form onSubmit={handleSubmit}>
                <select className="iOthers" value={game} onChange={e => setGame(e.target.value)} >
                    <option value="" disabled>Selecione o jogo</option>
                    {options.map(item => {
                        return (
                            <option value={item._id}>{item.name}</option>
                        )
                    })}
                </select>
                <input
                    type="text"
                    className="input iTxt"
                    value={award}
                    onChange={e => setAward(e.target.value.toUpperCase())}
                    placeholder="Award" />
                <input
                    type="datetime-local"
                    value={date}
                    className='input iTxt'
                    onChange={e => setDate(e.target.value)} />
                <button type="submit" className="input iBtn">Criar</button>
            </form>
        </div>
    )
}

export default Draw;