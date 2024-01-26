import React, {useState, useEffect} from "react";
import {AES, enc} from 'crypto-js';// Importe les outils de chiffrement pour décrypter le rôle stocké dans le localStorage
import {admin, pedagogue, utilisateur, validateur} from "./routes/authenticated";
import unAuthenticated from "./routes/unAuthenticated";
import {RouterProvider} from "react-router-dom";

function App() {
    const [role, setRole] = useState('')
    const access_token = localStorage.getItem('access_token');// Récupère l'access_token stocké dans le localStorage

    useEffect(() => {
        const crypteRole = localStorage.getItem('role')// Récupère le rôle chiffré/crypte
        if (crypteRole !== null && typeof crypteRole !== "undefined") {// Si le rôle est stocké dans le localStorage
            const decryptedRole = AES.decrypt(crypteRole, 'role').toString(enc.Utf8)// Déchiffre le rôle
            setRole(decryptedRole) // Met à jour le rôle
        }
    }, [])
    return (
        <div className="App">
            {
                access_token ? // Si l'utilisateur est authentifié
                    (role === 'utilisateur' && <RouterProvider router={utilisateur}/>) ||// Si le rôle est utilisateur
                    (role === 'admin' && <RouterProvider router={admin}/>) ||// Si le rôle est admin
                    (role === 'pedagogue' && <RouterProvider router={pedagogue}/>) || // Si le rôle est pedagogue
                    (role === 'validateur' && <RouterProvider router={validateur}/>) // Si le rôle est validateur
                    : <RouterProvider router={unAuthenticated}/>// Si l'utilisateur n'est pas authentifié
            }
        </div>
    );
}

export default App;
