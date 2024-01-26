import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

function NavbarUtilisateur() {
    const [user, setUser] = useState({});
    const [id, setId] = useState(localStorage.getItem("id"));


    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/users/${id}`)
            .then((res) => {
                setUser(res.data)
            })
    }, [])
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
                //Remove the token,id,role from local storage
                localStorage.removeItem('access_token');
                localStorage.removeItem('id');
                localStorage.removeItem('role');

                // redirect to the login page
                window.location.href = '/login'
            })
    }


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light fixed-top ">
                <div className="container-fluid ">
                    <a className="navbar-brand" href="#">
                        <img src="images/image3.png" alt="logo" width={'100px'}/>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        </ul>
                        <ul className="navbar-nav mb-2 mb-lg-0 d-flex ">
                            <li>
                                <Link to={'/utilisateur/home'} className="nav-link">Home</Link>
                            </li>
                            <li>
                                <Link to={'/utilisateur/listeJeux'} className="nav-link">Liste des jeux</Link>
                            </li>
                            {/*<li>*/}
                            {/*    <a onClick={handelLogout} className={'btn btn-dark'} href="#">Logout</a>*/}
                            {/*</li>*/}
                            <li className="nav-item dropdown pe-3">

                                <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#"
                                   data-bs-toggle="dropdown">
                                    <img src={`http://127.0.0.1:8000/${user.image}`} width={'30px'} alt="Profile" className="rounded-circle"/>
                                    <span className="d-none d-md-block dropdown-toggle ps-2">{user.user_name}</span>
                                </a>

                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile m-2">
                                    <li className="dropdown-header">
                                        <h6>{user.user_name}</h6>
                                        <span>{user.role}</span>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>

                                    <li>
                                        <Link to={ '/utilisateur/profile'} className="dropdown-item d-flex align-items-center" >
                                            <i className="bi bi-person"></i>
                                            <span>My Profile</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>

                                    <li>
                                        <Link to={ '/utilisateur/profile'} className="dropdown-item d-flex align-items-center" >
                                            <i className="bi bi-gear"></i>
                                            <span>Account Settings</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li>
                                        <a onClick={handelLogout} className="dropdown-item d-flex align-items-center"
                                           href="#">
                                            <i className="bi bi-box-arrow-right"></i>
                                            <span>Sign Out</span>
                                        </a>

                                    </li>

                                </ul>
                                {/* End Profile Dropdown Items */}
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>

        </>
    )
        ;
}

export default NavbarUtilisateur;
