import React, {useEffect, useState} from 'react';
import axios from "axios";
import NavbarUtilisateur from "./NavbarUtilisateur";
import Loading from "../Loading/Loading";

function ListeJeuxU(props) {
    const [jeux, setJeux] = useState([]); // Déclaration d'un état pour stocker les jeux
    const [search, setSearch] = useState(''); // Déclaration d'un état pour stocker la recherche de l'utilisateur
    const [loading, setLoading] = useState(true); // Déclaration d'un état pour stocker l'état de chargement
    const [score, setScore] = useState([]); // Déclaration d'un état pour stocker les scores

    const fetchJeu = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/jeux');
        setJeux(response.data.data)
        setLoading(false)
    }
    const fetchScore = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/score');
        setScore(response.data.data)
    }

    useEffect(() => {
        fetchJeu()
        fetchScore()
    }, []);

    const handelView = (id) => {
        // Redirection de l'utilisateur vers la page du jeu correspondant à l'ID passé en paramètre
        window.location.href = `/utilisateur/listeJeux/${id}`
    }

        // Définition d'une fonction pour gérer les changements dans la barre de recherche
    const handelChange = (e) => {
        setSearch(e.target.value)
        // Filtrage des jeux en fonction de la recherche de l'utilisateur
        const jeu = jeux.filter(el =>
            el.nom_jeu.toLowerCase().includes(search.toLowerCase()))
        setJeux(jeu)
    }
    const handelSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <>
            <NavbarUtilisateur/>
            <div className={'container mt-5 pt-5'}>
                <div className={'m-2'}>
                    <form className="d-flex" role="search" onSubmit={handelSubmit}>
                        <input className="form-control me-2" value={search} type="search" placeholder="Search"
                               onChange={handelChange}/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
                {loading && <Loading coleur={'gray'}/>}
                <div className="row g-4">
                    {
                        jeux ?
                            jeux.filter((ele) => ele.situation === 'accepter')
                                .map((el) => (
                                    <div className="col-md-6 col-lg-3 " key={el.id_jeu}>
                                        <div className="card position-relative">
                                            <div className="position-absolute top-0 m-4 translate-middle  bg-danger p-2 rounded-1 text-white">
                                                <strong>
                                                    {
                                                        score &&
                                                        score.find(sc => sc.id_jeu === el.id_jeu) ? score.find(sc => sc.id_jeu === el.id_jeu).score
                                                            : 0
                                                    }
                                                </strong>
                                            </div>
                                            <img src={`http://127.0.0.1:8000/${el.image}`}
                                                 className="card-img-top"
                                                 alt="Hollywood Sign on The Hill"/>
                                            <div className="card-body">
                                                <h4 className="card-title">{el.nom_jeu}</h4>
                                                <p className="card-text">
                                                    {el.description && el.description.substring(0, 150)}...
                                                </p>
                                                <div className="card-footer text-muted text-center">
                                                    <button className="btn btn-sm stretched-link "
                                                            onClick={() => handelView(el.id_jeu)}
                                                    >
                                                        Afficher plus
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            : <div className={'text-danger'}>Il n'y a pas de jeux actuellement</div>
                    }
                </div>
            </div>

        </>
    );
}

export default ListeJeuxU;