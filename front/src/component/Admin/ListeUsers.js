import React, { useEffect, useState } from 'react';
import NavbarAdmin from "./NavbarAdmin";
import axios from "axios";
import { Link } from "react-router-dom";
import { Confirm } from "react-st-modal";

function ListeUsers(props) {
    const [users, setUsers] = useState([]);// état pour stocker les utilisateurs
    // const [userID, setUserID] = useState(null); // état pour stocker l'ID de l'utilisateur
    const [currentPage, setCurrentPage] = useState(1);// état pour stocker le numéro de page courant
    // destructuration des données des utilisateurs
    const { data, meta } = users;

    const fetchUsers = async () => {// fonction pour récupérer les utilisateurs depuis l'API
        const response = await
            axios
                .get(`http://127.0.0.1:8000/api/users?page=${currentPage}`)
        setUsers(response.data)
    }
    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    // configuration des en-têtes pour les requêtes vers l'API
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
    }
    const deleteUser = async (userId) => { // fonction pour supprimer un utilisateur
        const result = await Confirm('Voulez-vous vraiment supprimer cet utilisateur ?',
            'Сonfirmation title');

        if (result) {
            // Сonfirmation confirmée
            axios.delete(`http://127.0.0.1:8000/api/users/${userId}`, config)
                .then((res) => {
                    window.location.reload()
                });
        } else {
            // confirmation non confirmée
        }
    }

    const handelUpdate = (id) => { // fonction pour gérer la mise à jour d'un utilisateur
        window.location.href = `/admin/modifier/${id}`
    }
    const nextPage = () => setCurrentPage(currentPage + 1);// fonction pour passer à la page suivante
    const prevPage = () => setCurrentPage(currentPage - 1);// fonction pour passer à la page précédente

    return (
        <>
            <NavbarAdmin />
            <div className={'container-fluid'}>
                <h3>Liste Users page</h3>
                <Link to={'/admin/ajouterUsers'} className={'btn btn-success my-3'}>Ajouter user</Link>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Profile</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && // si data existe
                            data.filter(el => el.id !== parseInt(localStorage.getItem('id')))
                                .map((ele, index) => (
                                    <tr key={index}>
                                        <td scope="row">{ele.user_name}</td>
                                        <td>
                                            <img src={`http://127.0.0.1:8000/${ele.image}`} width={'60px'} alt="" />
                                        </td>
                                        <td>{ele.email}</td>
                                        <td>{ele.role}</td>
                                        <td>
                                            <button className={'btn btn-primary m-1'}
                                                onClick={() => handelUpdate(ele.id)}
                                            >Modifier
                                            </button>
                                            <button className={'btn btn-danger m-1'}
                                                onClick={() => deleteUser(ele.id)}
                                            >
                                                Confirm
                                            </button>
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
                <div className={'text-center'}>
                    <button className={'btn rounded-1 btn-outline-dark m-1'} onClick={prevPage}
                        disabled={data && (data.length === 0 || currentPage === 1)}>Pervious
                    </button>
                    <button className={'btn rounded-1 btn-outline-dark m-1'} onClick={nextPage}
                        disabled={data && (data.length === 0 || currentPage === meta.last_page)}>Next
                    </button>
                </div>

            </div>

        </>
    )
        ;
}

export default ListeUsers;