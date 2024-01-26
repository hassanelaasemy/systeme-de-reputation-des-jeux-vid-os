import {createBrowserRouter} from "react-router-dom";
import Login from "../component/Login";
import React from "react";
import PageError from "../component/Loading/Loading";
import GetStarted from "../component/GetStarted";

export default createBrowserRouter([

    {
        path:'/',
        element: <GetStarted/>
    },
    {
        path: '/login',
        element: <Login/>
    },
])
