import React, {useEffect, useState} from 'react';
import axios from "axios";
import ReactStars from "react-rating-stars-component/dist/react-stars";

function DetailsJeu({jeu,id_jeu,id,moyenneScore,getScore}) {
    const [score, setScore] = useState({// State pour stocker le score donné par l'utilisateur        'note': '',
        'id': id,
        'id_jeu': id_jeu
    });
    // const [getScore, setGetScore] = useState([]);// State pour stocker les scores donnés par tous les utilisateurs pour ce jeu

    const submitHandel = (e) => {// Fonction pour soumettre le score de l'utilisateur
        e.preventDefault()
        axios.post(`http://127.0.0.1:8000/api/score`,
            {'score': score.note, 'id': score.id, 'id_jeu': score.id_jeu})
            .then((res) => {
                window.location.reload()
            }).catch(err => {
            console.log(err)
        })
    }

    const scoreValue = () => {
        return getScore.find(ele => ele.id === parseInt(id) && ele.id_jeu === parseInt(id_jeu))
    }

    const ratingChanged = (newRating) => {// Fonction pour gérer le changement de note
        setScore({...score, 'note': newRating})
    };
    return (
        <div>
            <div className="row g-0">
                <div className="col-md-6 col-lg-4">
                    <img src={`http://127.0.0.1:8000/${jeu.image}`} className="img-fluid rounded-start"
                         alt="..."/>
                </div>
                <div className="col-md-5">
                    <div className="card-body">
                        <h1 className="card-title mb-4 fw-bold">{jeu.nom_jeu}</h1>
                        <p className="card-text">
                            <strong>Categorie : </strong>{jeu.categorie && jeu.categorie.categorie}
                        </p>
                        <p className="card-text">
                            <strong>Devloppeur : </strong>{jeu.developpeur}
                        </p>
                        <p className="card-text">
                            <strong>Mots cles : </strong>{jeu.mots_cles}
                        </p>
                        <p className="card-text">
                            <strong>Platform : </strong>{jeu.platform && jeu.platform.platform}
                        </p>
                        <p className="card-text">
                            Lencement :
                            <small className="text-success">
                                {jeu.created_at && jeu.created_at.substring(0, 16).replace('T', ' ')}
                            </small>
                        </p>
                        <h3 className="card-text">
                            <strong>Score : </strong>{moyenneScore ? moyenneScore.toFixed(2) : 0}
                        </h3>
                        <div className={'card-text'}><strong>Votre score :</strong>
                            {scoreValue() ?
                                <ReactStars count={5}
                                            size={60}
                                            activeColor="#ffd700"
                                            value={scoreValue().score}
                                            edit={false}
                                />
                                :
                                <form onSubmit={submitHandel}>
                                    <button type={'submit'} className={'bg-transparent border-0'}>
                                        <ReactStars count={5} onChange={ratingChanged}
                                                    size={60}
                                                    activeColor="#ffd700"
                                        />
                                    </button>
                                </form>
                            }
                        </div>
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
    );
}

export default DetailsJeu;