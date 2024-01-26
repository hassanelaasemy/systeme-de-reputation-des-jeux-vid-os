import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import NavbarUtilisateur from "./NavbarUtilisateur";
import axios from "axios";
import Commentaire from "./Commentaire";
import ReactStars from "react-rating-stars-component/dist/react-stars";
import ListeCommentaires from "./ListeCommentaires";
import DetailsJeu from "./DetailsJeu";

function Jeu(props) {
    const [jeu, setJeu] = useState({});// State pour stocker les informations du jeu
    const [getScore, setGetScore] = useState([]);// State pour stocker les scores donnés par tous les utilisateurs pour ce jeu
    const {id_jeu} = useParams();// Récupération de l'id du jeu à partir de l'URL
    const [commentaires, setCommentaires] = useState([]);// State pour stocker les commentaires du jeu
    const id = localStorage.getItem('id');// Récupération de l'ID de l'utilisateur à partir du localStorage
    const [moyenneScore, setMoyenneScore] = useState('');// State pour stocker la moyenne des scores
    const [user, setUser] = useState({});// State pour stocker les informations de l'utilisateur
    const [currentPage, setCurrentPage] = useState(1);// State pour stocker la page actuelle
    const [loading, setLoading] = useState(true);// State pour gérer l'affichage du spinner lors du chargement des données
    const [score, setScore] = useState({// State pour stocker le score donné par l'utilisateur        'note': '',
        'id': id,
        'id_jeu': id_jeu
    });
    const ratingChanged = (newRating) => {// Fonction pour gérer le changement de note
        setScore({...score, 'note': newRating})
    };

    // const submitHandel = (e) => {// Fonction pour soumettre le score de l'utilisateur
    //     e.preventDefault()
    //     axios.post(`http://127.0.0.1:8000/api/score`,
    //         {'score': score.note, 'id': score.id, 'id_jeu': score.id_jeu})
    //         .then((res) => {
    //             window.location.reload()
    //         }).catch(err => {
    //         console.log(err)
    //     })
    // }

    useEffect(() => {// Fonction pour récupérer les données du jeu, les commentaires, les scores et les informations de l'utilisateur
        const fetchData = async () => {
            // Appel des API en parallèle pour récupérer les données
            const [response1, response2, response3, response4] = await Promise.all([
                axios.get(`http://127.0.0.1:8000/api/jeux/${id_jeu}`),
                axios.get(`http://127.0.0.1:8000/api/score`),
                axios.get(`http://127.0.0.1:8000/api/commentaire?page=${currentPage}`),
                axios.get(`http://127.0.0.1:8000/api/users/${id}`),
            ]);
            //get jeu
            setJeu(response1.data)
            //get score
            setGetScore(response2.data.data)
            const dataScore = response2.data.data.filter((el) => el.id_jeu === parseInt(id_jeu))
            const sum = dataScore.reduce((sum, cur) => {
                sum += cur.score
                return sum
            }, 0)
            setMoyenneScore(sum / dataScore.length)
            //get comment
            setCommentaires(response3.data)
            // get user
            setUser(response4.data)
            //loading
            setLoading(false)

        };
        fetchData();
    }, [currentPage]);


    const {data, meta} = commentaires;

    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);

    const scoreValue = () => {
        return getScore.find(ele => ele.id === parseInt(id) && ele.id_jeu === parseInt(id_jeu))
    }
    return (
        <div className={'bg-dark'}>
            <NavbarUtilisateur/>
            <div className={' mt-5 container-xxl rounded-2 p-4 shadow-lg'}>
                <div className={'container-xxl text-white'}>
                    <h1 className={'my-md-4'}>Details de jeu</h1>
                    <div className="card mb-3 bg-dark">

                        {/*Details de jeu*/}
                        <DetailsJeu jeu={jeu} id={id} id_jeu={id_jeu} moyenneScore={moyenneScore} getScore={getScore}/>

                        <hr className={'bg-white p-1 '}/>
                        <div className={'col-md-12 '}>
                            {/*listes des commentaires */}
                            <ListeCommentaires data={data} id_jeu={id_jeu} loading={loading} />

                            <div className={'text-center'}>
                                <button className={'btn rounded-1 text-white btn-outline-dark m-1'}
                                        onClick={prevPage}
                                        disabled={data && (data.length === 0 || currentPage === 1)}>
                                    Pervious
                                </button>
                                <button className={'btn rounded-1 text-white btn-outline-dark m-1'}
                                        onClick={nextPage}
                                        disabled={data && (data.length === 0 || currentPage === meta.last_page)}>
                                    Next
                                </button>
                            </div>
                            <hr/>
                            {/*Ajouter commentaire*/}
                            <Commentaire id_jeu={id_jeu} user={user} />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Jeu;
