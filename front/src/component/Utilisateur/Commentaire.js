import React, {useEffect, useState} from 'react';
import axios from "axios";

function Commentaire({id_jeu, user}) {
    // Initialisation de l'état du commentaire avec les champs de base
    const [comment, setComment] = useState({
        'commentaire': '',
        'id': localStorage.getItem('id'),
        'id_jeu': id_jeu,
        'user_name': '',
        'image': ''
    });

    const handelChange = (e) => {// Cette fonction est appelée à chaque fois que l'utilisateur change le contenu du champ de texte
        const name = e.target.name;
        const value = e.target.value;
        // Mettre à jour l'état du commentaire avec la nouvelle valeur et les informations utilisateur
        setComment({...comment, [name]: value, user_name: user.user_name, image: user.image})
    }


    const handelSubmit = (e) => {// Cette fonction est appelée lorsqu'un utilisateur soumet un commentaire
        e.preventDefault()
        // Envoyer une requête POST avec les informations du commentaire à l'API pour l'enregistrer
        axios.post(`http://127.0.0.1:8000/api/commentaire`, comment)
            .then((res) => {
                // Recharger la page pour afficher les nouveaux commentaires
                window.location.reload()
            })
            .catch((err) => {
                console.log(err.response.data.errors)
            });
    }
    return (<div>
        <section>
            <div className="container py-3">
                <div className="row d-flex justify-content-center  ">
                    <div className="col-md-12 col-lg-10 col-xl-8">
                        <div className="card bg-light bg-opacity-10 rounded-4">
                            <form className="card-footer py-3 border-0" onSubmit={handelSubmit}>
                                <div className="d-flex flex-start w-100">
                                    <img className="rounded-circle shadow-1-strong me-3"
                                         src={`http://127.0.0.1:8000/${user.image}`}
                                         alt="avatar" width="40"
                                         height="40"/>
                                    <div className="form-outline w-100">
                                        <label className="form-label" htmlFor="textAreaExample">Message</label>
                                        <textarea className="form-control text-white bg-dark shadow-lg border-secondary"
                                                  id="textAreaExample" rows="4"
                                                  name={'commentaire'} onChange={handelChange}
                                                  value={comment.commentaire}
                                                  placeholder={'Que pensez-vous ?'}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="float-end mt-2 pt-1">
                                    <button type="submit"
                                            className="btn rounded-1 btn-outline-dark text-white m-1 btn-sm">
                                        Poster
                                    </button>
                                    <button type="reset" className="btn btn-outline-primary btn-sm">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>);
}

export default Commentaire;