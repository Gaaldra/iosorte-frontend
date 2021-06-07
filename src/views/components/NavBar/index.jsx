import React from 'react';

function NavBar({ onButtonClick }) {

    const changePage = (event) => {
        let element = document.getElementById('active')
        element.classList.remove('active')
        element.id = ''
        event.target.classList.add('active')
        event.target.id = 'active'
        onButtonClick(event.target.value)
    }

    return (
        <ul className="nav nav-pills justify-content-center">
            <li className='nav-item mx-1'>
                <button
                    className='nav-link text-white border active'
                    id='active'
                    value='0'
                    onClick={e => changePage(e)}>Sorteios</button>
            </li>
            <li className='nav-item mx-1'>
                <button
                    className='nav-link text-white border'
                    value='1'
                    onClick={e => changePage(e)}>Meus tickets</button>
            </li>
            <li className='nav-item mx-1'>
                <button
                    className='nav-link text-white border'
                    value='2'
                    onClick={e => changePage(e)}>Meu perfil</button>
            </li>
            <li className='nav-item mx-1'>
                <button
                    className='nav-link text-white border'
                    value='3'
                    onClick={e => {
                        localStorage.removeItem('token')
                        changePage(e)
                    }}>Sair</button>
            </li>
        </ul>
    )
};

export default NavBar;