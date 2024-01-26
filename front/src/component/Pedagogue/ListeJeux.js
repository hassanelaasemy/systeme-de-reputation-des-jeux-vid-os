import React, {useEffect, useState} from 'react';
import NavbarPedagogue from "./NavbarPedagogue";
import axios from "axios";
import Loading from "../Loading/Loading";

function ListeJeux(props) {
    const [jeux, setJeux] = useState([]);
    const [id, setId] = useState(localStorage.getItem('id'));
    const [loading, setLoading] = useState(true);


    const fetchJeux = async () => {
        const response = await
            axios.get(`http://127.0.0.1:8000/api/jeux`)
        setJeux(response.data.data)
        setLoading(false)
    }


    useEffect(() => {
        fetchJeux()
    }, [])

    return (
        <>
            <NavbarPedagogue/>
            <div className={'container-fluid '}>
                <h3>Liste Jeux page</h3>
                {loading ? <Loading coleur={'black'}/> :
                    <div>
                        {jeux.find((el) => el.id === parseInt(id)) ?
                            <div>
                                <table className="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th scope="col">Nom jeu</th>
                                        <th scope="col">Platform</th>
                                        <th scope="col">Categorie</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Descrition</th>
                                        <th scope="col">Developpeur</th>
                                        <th scope="col">Situation</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        jeux.filter((ele) => ele.id === parseInt(id))
                                            .map((el, index) => (
                                                    <tr key={index}>
                                                        <td>{el.nom_jeu}</td>
                                                        <td>{el.platform.platform}</td>
                                                        <td>{el.categorie.categorie}</td>
                                                        <td>
                                                            <img src={`http://127.0.0.1:8000/${el.image}`} width={'60px'}
                                                                 alt=""/>
                                                        </td>
                                                        <td>{el.description && el.description.substring(0, 120)}...</td>
                                                        <td>{el.developpeur}</td>
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
                                                    </tr>
                                                )
                                            )
                                    }
                                    </tbody>
                                </table>
                            </div>
                            :
                            <h2 className={'text-danger text-center p-2'}>Vous n'avez publié aucun jeu</h2>
                        }
                    </div>
                }

            </div>
        </>

    );
}

export default ListeJeux;
