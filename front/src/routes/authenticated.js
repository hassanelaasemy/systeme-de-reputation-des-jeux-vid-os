import {createBrowserRouter,BrowserRouter } from "react-router-dom";
import React from "react";
import HomeAdmin from "../component/Admin/HomeAdmin";
import AjouterUsers from "../component/Admin/AjouterUsers";
import ListeUsers from "../component/Admin/ListeUsers";
import ModifierUser from "../component/Admin/ModifierUser";
import ErrorPage from "../component/ErrorPage";
import GetStarted from "../component/GetStarted";
import HomeUtilisateur from "../component/Utilisateur/HomeUtilisateur";
import Profile from "../component/Utilisateur/Profile";
import ListeJeuxU from "../component/Utilisateur/ListeJeuxU";
import Jeu from "../component/Utilisateur/Jeu";
import Pedagogue from "../component/Pedagogue/Pedagogue";
import HomePedagogue from "../component/Pedagogue/HomePedagogue";
import AjouterJeu from "../component/Pedagogue/AjouterJeu";
import ListeJeux from "../component/Pedagogue/ListeJeux";
import HomeValidateur from "../component/Validateur/HomeValidateur";
import ListeJeuxAttente from "../component/Validateur/ListeJeuxAttente";
export const  admin= createBrowserRouter([
    // routes admin
    {
        path: '/',
        element: <GetStarted/>
    },
    {
        path: '/admin/home',
        element: <HomeAdmin />
    },
    {
        path: '/admin/ajouterUsers',
        element: <AjouterUsers />
    },
    {
        path: '/admin/listeUsers',
        element: <ListeUsers />
    },
    {
        path: '/admin/modifier/:id',
        element: <ModifierUser/>
    },

]);

export const utilisateur=createBrowserRouter([
    // routes utilisateur
    {
        path: '/',
        element: <GetStarted/>
    },
    {
        path: '/utilisateur/home',
        element: <HomeUtilisateur />
    },
    {
        path: '/utilisateur/profile',
        element: <Profile />
    },
    {
        path: '/utilisateur/listeJeux',
        element: <ListeJeuxU />
    },
    {
        path: '/utilisateur/listeJeux/:id_jeu',
        element: <Jeu />
    },
]);

export const pedagogue= createBrowserRouter([
    // routes pedagogue
    {
        path: '/',
        element: <GetStarted/>
    },
    {
        path: '/pedagogue/home',
        element: <HomePedagogue />
    },
    {
        path: '/pedagogue/ajouterJeux',
        element: <AjouterJeu />
    },
    {
        path: '/pedagogue/listeJeux',
        element: <ListeJeux />
    },

]);

export const validateur= createBrowserRouter([
    // routes validteur
    {
        path: '/',
        element: <GetStarted/>
    },
    {
        path: '/validateur/home',
        element: <HomeValidateur />
    },
    {
        path: '/validateur/listeJeux',
        element: <ListeJeuxAttente />
    },
    {
        path: `/validateur/listeJeux/:id`,
        element: <Jeu />
    }

]);