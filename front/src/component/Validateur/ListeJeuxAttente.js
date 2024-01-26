import React, {useEffect, useState} from 'react';
import axios from "axios";
import NavbarValidateur from "./NavbarValidateur";
import ListeJeuxV from "./ListeJeuxV";

function ListeJeuxAttente(props) {
    const [jeux, setJeux] = useState([]);
    const [idJeu, setIdJeu] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);// état pour stocker le numéro de page courant

    const fetchJeux = async () => {
        const response = await
            axios.get(`http://127.0.0.1:8000/api/jeux?page=${currentPage}`)
        setJeux(response.data.data)
    }

    useEffect(() => {
        fetchJeux()
    }, [currentPage])

    const handelView = (id_jeu) => {
        window.location.href = `/validateur/listeJeux/${id_jeu}`;
    }

    const handelAccepter = (id_jeu) => {
        axios.patch(`http://127.0.0.1:8000/api/jeux/${id_jeu}`, {situation: 'accepter'})
            .then((res) => {
                console.log(res)
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const handelRefuser = (id_jeu) => {
        axios.patch(`http://127.0.0.1:8000/api/jeux/${id_jeu}`, {situation: 'refuser'})
            .then((res) => {
                console.log(res)
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const nextPage = () => setCurrentPage(currentPage + 1);// fonction pour passer à la page suivante
    const prevPage = () => setCurrentPage(currentPage - 1);// fonction pour passer à la page précédente

    return (
        <>
            <NavbarValidateur/>
            <div className={'container-fluid '}>
                <h3>Jeux en attente d’aperçu</h3>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">Nom jeu</th>
                        <th scope="col">Image</th>
                        <th scope="col">Description</th>
                        <th scope="col">Developpeur</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        jeux.data&&
                        jeux.data.filter((ele) => ele.situation === 'en attente')
                            .map((el, index) => (
                                    <tr key={index} className={'text-center'}>
                                        <td>{el.nom_jeu}</td>
                                        <td>
                                            <img src={`http://127.0.0.1:8000/${el.image}`} width={'60px'} alt=""/>
                                        </td>
                                        <td>{el.description && el.description.substring(0, 100)}...</td>
                                        <td>{el.developpeur}</td>
                                        <td>
                                            <button className={'btn btn-primary m-1'}
                                                    onClick={() => handelView(el.id_jeu)}>View
                                            </button>
                                            <button className={'btn btn-success m-1'}
                                                    onClick={() => handelAccepter(el.id_jeu)}
                                            >Accepter
                                            </button>
                                            <button className={'btn btn-danger m-1'}
                                                    onClick={() => handelRefuser(el.id_jeu)}
                                            >Refuser
                                            </button>
                                        </td>
                                    </tr>
                                )
                            )
                    }
                    </tbody>
                </table>
                <div className={'text-center'}>
                    <button className={'btn rounded-1 btn-outline-dark m-1'} onClick={prevPage}
                            disabled={jeux.data && (jeux.data.length === 0 || currentPage === 1)}>Pervious
                    </button>
                    <button className={'btn rounded-1 btn-outline-dark m-1'} onClick={nextPage}
                            disabled={jeux.data && (jeux.data.length === 0 || currentPage === jeux.last_page)}>Next
                    </button>
                </div>
            </div>
            <ListeJeuxV/>
        </>
    );
}

export default ListeJeuxAttente;
