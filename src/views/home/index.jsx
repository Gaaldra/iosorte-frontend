import React from 'react';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <section>
            <div className="bd-masthead mb-3 mt-3 mt-md-5 pt-md-5">
                <div className="container px-4 px-md-3">
                    <div className="row align-items-lg-center">
                        <div className="col-8 mx-auto col-md-4 order-md-2 col-lg-5">
                            <img className="img-fluid" src={Logo} alt="Logo" />
                        </div>
                        <div className="col-md-8 order-md-1 col-lg-7 text-justify text-wrap text-md-start">
                            <h1 className="mb-3">Participe dos nossos sorteios e teste a sua sorte</h1>
                            <p className="lead mb-4">É muito fácil participar. Basta ser cadastrado em nosso site, escolher um dos sorteios disponíveis e pronto, basta aguardar até a data em que sortearemos um vencedor. Tá esperando o que? Clique no botão abaixo e participe.</p>
                            <div className="d-flex flex-column flex-md-row">
                                <Link to='/entrar' className="btn btn-success btn-lg mb-3 me-md-3">Entrar</Link>
                                <Link to='/cadastrar' className="btn btn-outline-light btn-lg mb-3 me-md-3">Cadastrar</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Home;