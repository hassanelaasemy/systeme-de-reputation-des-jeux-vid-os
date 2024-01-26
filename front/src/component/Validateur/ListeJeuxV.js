import React, {useEffect, useState} from 'react';
import axios from "axios";
import NavbarValidateur from "./NavbarValidateur";

function ListeJeuxAttente(props) {
    const [jeux, setJeux] = useState([]);
    const [idJeu, setIdJeu] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);// état pour stocker le numéro de page courant
    // const {data,meta}=jeux


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

    const nextPage = () => setCurrentPage(currentPage + 1);// fonction pour passer à la page suivante
    const prevPage = () => setCurrentPage(currentPage - 1);// fonction pour passer à la page précédente


    return (
        <>
            <div className={'container-fluid '}>
                <h3>Liste des jeux</h3>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Nom jeu</th>
                        <th scope="col">Situation</th>
                        <th scope="col">Date de lencement</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        jeux.data &&
                        jeux.data.filter((ele) => ele.situation !== 'en attente')
                            .map((el, index) => (
                                    <tr key={index} className={'text-center'}>
                                        <td>
                                            <img src={`http://127.0.0.1:8000/${el.image}`} width={'60px'} alt=""/>
                                        </td>
                                        <td>{el.nom_jeu}</td>
                                        {
                                            el.situation === 'refuser' &&
                                            <td className={'bg-danger'}>{el.situation}</td>
                                        }
                                        {
                                            el.situation === 'accepter' &&
                                            <td className={'bg-success'}>{el.situation}</td>
                                        }
                                        {
                                            el.situation === 'en attente' &&
                                            <td className={'bg-warning '}>{el.situation}</td>
                                        }
                                        <td> {el.updated_at && el.updated_at.substring(0,10)}</td>
                                        <td>
                                            <button className={'btn btn-primary m-1'}
                                                    onClick={() => handelView(el.id_jeu)}>View
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
        </>
    );
}

export default ListeJeuxAttente;
