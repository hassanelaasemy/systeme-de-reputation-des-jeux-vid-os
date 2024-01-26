import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import NavbarValidateur from "./NavbarValidateur";
import axios from "axios";

function Jeu(props) {
    const {id} = useParams();
    const [jeu, setJeu] = useState({});
    const [user, setUser] = useState({});

    // fetch jeu
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/jeux/${id}`)
            .then((res) => {
                setJeu(res.data)
            })
    }, [])

    // fetch user
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/users/${id}`)
            .then((res) => {
                // console.log(res.data)
                setUser(res.data)
            })
    }, [])
    return (
        <div>
            <NavbarValidateur/>
            <div className={'container'}>
                <h1>Details de jeu</h1>
                <div>
                    <h4>Publier par : {user.user_name} ,le {user.created_at ? user.created_at.substring(0,10):''}</h4>
                </div>
                <div className="row g-2">
                    <div className="col-md-4">
                        <img src={`http://127.0.0.1:8000/${jeu.image}`} className="img-fluid rounded-start" alt="..."/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h1 className="card-title mb-4">{jeu.nom_jeu}</h1>
                            <p className="card-text"><strong>Type de jeu : </strong>{jeu.type_jeu}</p>
                            <p className="card-text"><strong>Devloppeur : </strong>{jeu.developpeur}</p>
                            <p className="card-text"><strong>Mots cles : </strong>{jeu.mots_cles}</p>
                            <p className="card-text">Lencement : <small className="text-success">{jeu.created_at}</small></p>
                        </div>
                    </div>
                    <div className={'col-md-12 my-4'}>
                        <h4>Description</h4>
                        <p className={'card-text'}>{jeu.description}</p>
                    </div>
                    <div className={'col-md-12 my-4'}>
                        <h4>Senario</h4>
                        <p className={'card-text'}>{jeu.senario}</p>
                    </div>
                    <div className={'col-md-12 my-4'}>
                        <h4>Indications</h4>
                        <p className={'card-text'}>{jeu.indications}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Jeu;