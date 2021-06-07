import React, { useState } from 'react';
import api from '../../services/api';

function Game() {
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [urlImg, setUrlImg] = useState("")

    function handleSubmit(e) {
        e.preventDefault();
        if (!name) return alert('Falta o nome');
        if (!desc) return alert('Falta a descrição');
        if (!urlImg) return alert('Falta a url da imagem');
        api.post('/secret/add-game', {
            name: name,
            description: desc,
            urlImage: urlImg
        },{ 
            headers: { 
                "authorization": `Bearer ${localStorage.getItem('token')}` 
            } 
        }).then(result => window.location.href = "adm/dashboard").catch(error => alert(error))
    }

    return (
        <div className="container box">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="input iTxt"
                    value={name}
                    onChange={e => setName(e.target.value.toUpperCase())}
                    placeholder="Nome do Jogo" />
                <input
                    type="text"
                    value={desc}
                    className='input iTxt'
                    onChange={e => setDesc(e.target.value)}
                    placeholder="Descrição" />
                <input
                    type="text"
                    value={urlImg}
                    className='input iTxt'
                    onChange={e => setUrlImg(e.target.value)}
                    placeholder="Url da Imagem" />
                <button type="submit" className="input iBtn">Criar</button>
            </form>
        </div>
    )
}

export default Game;