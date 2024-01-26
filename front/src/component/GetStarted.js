import React, {useState, useEffect} from 'react';
import {AES, enc} from 'crypto-js';// Importe les outils de chiffrement pour décrypter le rôle stocké dans le localStorage
import {Link} from 'react-router-dom';
import Navbar from "./Navbar";

function GetStarted(props) {
    const [role, setRole] = useState('')
    const crypteRole = localStorage.getItem('role')// Récupère le rôle chiffré/crypte
    useEffect(() => {
        if (crypteRole !== null && typeof crypteRole !== "undefined") {
            const decryptedRole = AES.decrypt(crypteRole, 'role').toString(enc.Utf8)// Déchiffre le rôle
            setRole(decryptedRole)
        }
    }, []);


    const getStarted = () => {
        if (!crypteRole) {
            window.location.href = '/login'
        } else if (role === 'pedagogue') {
            window.location.href = '/pedagogue/home'
        } else if (role === 'utilisateur') {
            window.location.href = '/utilisateur/home'
        } else if (role === 'admin') {
            window.location.href = '/admin/home'
        } else if (role === 'validateur') {
            window.location.href = '/validateur/home'
        }
    }
    return (
        <div>
            <Navbar/>
            <div className="container ">
                <div className="row justify-content-center align-items-center mt-5 ">
                    <div className="col-xl-5 col-lg-9 text-center mt-5">
                        <h1>Commencez à noter vos <span className={'text-primary'}>jeux vidéo</span> avec notre
                            site.</h1>
                        <h6>Bienvenue sur notre site de notation des jeux vidéo ! Ici, vous pouvez trouver des
                            critiques et des notes pour les jeux les plus populaires du moment.</h6>
                        <div className="m-4">
                            <button onClick={() => getStarted()} className="btn btn-primary">Get Started</button>
                        </div>
                    </div>
                    <div className="col-xl-7 col-lg-9 text-center ">
                        <img src="images/image1.png" alt="image" width={'100%'}/>
                    </div>
                </div>

                <div className="row mt-5 ">
                    <h1 className={'text-center my-4'}>Services</h1>
                    <div className="p-2 col-md-6 col-lg-4 d-flex align-items-stretch mb-5 mb-lg-0">
                        <div className="icon-box">
                            <h4 className="title"><a href="">Agrégation de notes et de critiques</a></h4>
                            <p className="description">
                                Les sites de notation des jeux vidéo peuvent agréger les notes et les critiques des
                                différents médias spécialisés dans les jeux vidéo pour fournir une note moyenne ou un
                                classement des jeux les mieux notés.
                            </p>
                        </div>
                    </div>

                    <div className="p-2 col-md-6 col-lg-4 d-flex align-items-stretch mb-5 mb-lg-0">
                        <div className="icon-box">
                            <h4 className="title"><a href="">Forums de discussion</a></h4>
                            <p className="description">
                                Les sites peuvent permettre aux utilisateurs de discuter des jeux vidéo, de partager des
                                avis et de poser des questions.
                            </p>
                        </div>
                    </div>

                    <div className="p-2 col-md-6 col-lg-4 d-flex align-items-stretch mb-5 mb-lg-0">
                        <div className="icon-box">
                            <h4 className="title"><a href="">Critiques approfondies</a></h4>
                            <p className="description">
                                Les sites peuvent proposer des critiques approfondies des jeux vidéo, analysant en
                                détail les mécaniques de jeu, l'histoire, les graphismes et la bande sonore.
                            </p>
                        </div>
                    </div>

                    <div className="p-2 col-md-6 col-lg-4 d-flex align-items-stretch mb-5 mb-lg-0">
                        <div>
                            <h4 className="title"><a href="">Guides de jeux</a></h4>
                            <p className="description">
                                Les sites peuvent proposer des guides de jeux pour aider les joueurs à naviguer dans les
                                différentes étapes du jeu.
                            </p>
                        </div>
                    </div>

                </div>

                <div className={'row gap-5 align-items-center'}>
                    <h1 className={'text-center'}>À propos</h1>
                    <div className="col-md-5 col-lg-6 d-flex align-items-stretch mb-5 mb-lg-0">
                        <div>
                            <p className="description">
                                Nous sommes une équipe de passionnés de jeux vidéo qui souhaitent offrir une plateforme
                                pour aider les joueurs à trouver les meilleurs jeux et à partager leurs opinions.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-5 d-flex align-items-stretch mb-5 mb-lg-0">
                        <img src="images/image2.jpg" alt="image" width={'100%'}/>
                    </div>

                    <div className="col-md-6 col-lg-5 d-flex align-items-stretch mb-5 mb-lg-0">
                        <img src="images/image3.jpg" alt="image" width={'100%'}/>
                    </div>
                    <div className="col-md-5 col-lg-6 d-flex align-items-stretch mb-5 mb-lg-0">
                        <div>
                            <p className="description">
                                Notre équipe de critiques et d'experts en jeux vidéo travaille dur pour fournir des
                                critiques honnêtes et impartiales pour chaque jeu. Nous croyons que chaque joueur a le
                                droit de connaître les forces et les faiblesses d'un jeu avant de l'acheter ou de
                                l'essayer. Nous encourageons également nos utilisateurs à partager leurs propres
                                critiques et opinions sur les jeux qu'ils ont essayés.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-5 col-lg-6 d-flex align-items-stretch mb-5 mb-lg-0">
                        <div>
                            <p className="description">
                                Notre site offre une grande variété de services, tels que l'agrégation de notes et de
                                critiques, des critiques approfondies, des classements des jeux, des forums de
                                discussion, des guides de jeux, des actualités et des vidéos de présentation. Nous nous
                                efforçons de fournir une expérience utilisateur intuitive et facile à utiliser, et nous
                                sommes toujours à la recherche de moyens d'améliorer notre site pour répondre aux
                                besoins de notre communauté de joueurs.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-5 d-flex align-items-stretch mb-5 mb-lg-0">
                        <img src="images/image4.jpg" alt="image" width={'100%'}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetStarted;