import React from 'react';
import NavbarPedagogue from "./NavbarPedagogue";
import {createBrowserRouter, Route, RouterProvider, Routes} from "react-router-dom";
import AjouterJeu from "./AjouterJeu";
import ListeJeux from "./ListeJeux";
import HomePedagogue from "./HomePedagogue";


function Pedagogue(props) {
    return (
        <div>
            {/*<NavbarPedagogue/>*/}
                {/*<Routes>*/}
                {/*    <Route path={'/*'} element={<HomePedagogue/>}/>*/}
                {/*    <Route path={'/ajouterJeux'} element={<AjouterJeu/>}/>*/}
                {/*    <Route path={'/listeJeux'} element={<ListeJeuxAttente/>}/>*/}
                {/*</Routes>*/}
        </div>
    );
}

export default Pedagogue;