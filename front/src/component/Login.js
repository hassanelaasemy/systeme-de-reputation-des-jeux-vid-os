import React, {useState, useEffect} from 'react';
import axios from "axios";
import Navbar from "./Navbar";
import {AES,enc} from 'crypto-js';


function Login(props) {
    const [inputs, setInputs] = useState({// Initialisation du state inputs avec un objet contenant les champs email et password
        'email': '',
        'password': ''
    });
    const [error, setError] = useState([]);// Initialisation du state error
    const [role, setRole] = useState('');// Initialisation du state role
    const [isLoggin, setIsLoggin] = useState(false);
    const [accounNotFound, setAccounNotFound] = useState([]);

    const handelChange = (e) => {// Définition de la fonction handelChange qui sera appelée à chaque changement de valeur dans un champ
        const name = e.target.name;
        const value = e.target.value;
        setInputs({...inputs, [name]: value}) // Mise à jour du state inputs avec l'objet
    }


    const handelSubmit = (e) => {// Définition de la fonction handelSubmit qui sera appelée lors de la soumission du formulaire
        e.preventDefault();
        // Envoi d'une requête POST à l'API avec les données saisies dans le formulaire
        axios.post(`http://127.0.0.1:8000/api/login`, inputs)
            .then((res) => {
                setError([])
                setRole(res.data.role)
                // // Save access_token in the local storage
                if (res.status === 200) {
                    localStorage.setItem('access_token', res.data.access_token)
                    localStorage.setItem('id', res.data.id)
                    // localStorage.setItem('role', res.data.role)

                    const crypteRole=AES.encrypt(res.data.role,'role')
                    localStorage.setItem('role',crypteRole.toString())
                }

                // Mise à jour du state isLoggin à true
                setIsLoggin(true)

            })
            .catch((err) => {
                if (err.response.status === 421) {
                    console.log(err.response.data);
                    // setAccounNotFound(err.response.data.errors)
                    setError(err.response.data)
                } else {
                    setError(err.response.data.errors) // Mise à jour du state error avec les erreurs retournées par l'API
                }
            })
    }

    useEffect(() => {// Utilisation du hook useEffect qui sera appelé à chaque changement du state isLoggin
        if (isLoggin && role === 'pedagogue') {
            window.location.href = '/pedagogue/home'
        } else if (isLoggin && role === 'utilisateur') {
            window.location.href = '/utilisateur/home'
        } else if (isLoggin && role === 'admin') {
            window.location.href = '/admin/home'
        } else if (isLoggin && role === 'validateur') {
            window.location.href = '/validateur/home'
        }
    }, [isLoggin])


    return (
        <div>
            <Navbar/>
            <section
                className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div
                            className="col-lg-4  col-md-7 d-flex flex-column align-items-center justify-content-center">

                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="pt-4 pb-2">
                                        {error.message && <div className="alert alert-danger" role="alert">
                                            {error.message}
                                        </div>}
                                        <h5 className="card-title text-center pb-0 fs-4">Connectez-vous à votre compte</h5>
                                        <p className="text-center small">Entrez votre email & votre mot de passe pour vous connecter</p>
                                    </div>

                                    <form className="row g-3 needs-validation" onSubmit={handelSubmit}>

                                        <div className="col-12">
                                            <label className="form-label">Email</label>
                                            <div className="input-group">
                                                <span className="input-group-text" id="inputGroupPrepend">@</span>
                                                <input type="text" onChange={handelChange} name={'email'}
                                                       className="form-control" id="yourUsername"/>
                                            </div>
                                            <div className="text-danger">{error.email}</div>
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label">Password</label>
                                            <input type="password" onChange={handelChange} name={'password'}
                                                   className="form-control" id="yourPassword"/>
                                            <div className="text-danger">{error.password}</div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-check">
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary w-100" type="submit">Login</button>
                                        </div>

                                    </form>

                                </div>
                            </div>


                        </div>
                    </div>
                </div>

            </section>

        </div>
    );
}

export default Login;