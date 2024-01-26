import React, {useEffect, useState} from 'react';
import NavbarUtilisateur from "./NavbarUtilisateur";
import axios from "axios";

function HomePedagogue(props) {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/users`)
            .then((res) => {
                const user_name=res.data.data.find((ele)=>ele.id===parseInt(localStorage.getItem("id"))).user_name
                setUserName(user_name)
            })
    }, [])


    return (
        <div className={'mt-5'}>
            <NavbarUtilisateur/>
            <h2>Bonjour {userName}.</h2>
        </div>
    );
}

export default HomePedagogue;