import React from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

function NavbarPedagogue(props) {
    const handelLogout = () => {
        //Make an API request
        axios.post(`http://127.0.0.1:8000/api/logout`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                }
            })
            .then((res) => {
                //Remove the token from local storage
                localStorage.removeItem('access_token');
                localStorage.removeItem('id');
                localStorage.removeItem('role');
                // redirect to the login page
                window.location.href = '/login'
            })


    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">LOGO</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        </ul>
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li>
                                <Link to={'/validateur/home'} className="nav-link">Home</Link>
                            </li>
                            <li>
                                <Link to={'/validateur/listeJeux'} className="nav-link">Liste des jeux</Link>
                            </li>
                            <li>
                                <a onClick={handelLogout} className={'btn btn-dark'} href="#">Logout</a>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavbarPedagogue;