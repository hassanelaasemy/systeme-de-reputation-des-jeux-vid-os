import React, {useEffect, useState} from 'react';
import NavbarAdmin from "./NavbarAdmin";
import axios from "axios";
import {config} from "../Config/config";

function AjouterJeu(props) {
    const [inputs, setInputs] = useState({
        'user_name': '',
        'email': '',
        'password': '',
        'role': '',
    });
    const [error, setError] = useState({});
    const [image, setImage] = useState([]);
    const handelChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs({...inputs, [name]: value})
    }
    const handelSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image.image);
        formData.append('user_name', inputs.user_name);
        formData.append('email', inputs.email);
        formData.append('password', inputs.password);
        formData.append('role', inputs.role);

        axios.post(`http://127.0.0.1:8000/api/users`, formData)
            .then((res) => {
                setError([])
                window.location.href = '/admin/listeUsers';
            })
            .catch((err) => {
                setError(err.response.data.errors)
            });
    }
    return (
        <>
            <NavbarAdmin/>
            <div className={'container-fluid'}>

                <h3 className="">Ajouter Users page</h3>
                <form className={'row g-3'} onSubmit={handelSubmit}>
                    <div className="col-md-6">
                        <label className="form-label">Nom</label>
                        <input type="text" onChange={handelChange} name={'user_name'} className="form-control"/>
                        <span className={'text-danger'}>{error.user_name}</span>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input type="email" onChange={handelChange} name={'email'} className="form-control"/>
                        <span className={'text-danger'}>{error.email}</span>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Password</label>
                        <input type="password" onChange={handelChange} name={'password'} className="form-control"/>
                        <span className={'text-danger'}>{error.password}</span>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Role</label>
                        <select name="role" value={inputs.role} onChange={handelChange} className={'form-control'}
                                id="">
                            <option value="" disabled>Choisir un rôle</option>
                            <option value="admin">Admin</option>
                            <option value="pedagogue">Pedagogue</option>
                            <option value="utilisateur">Utilisateur</option>
                            <option value="validateur">Validateur</option>
                        </select>
                        <span className={'text-danger'}>{error.role}</span>

                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Image</label>
                        <input type="file" className="form-control" name={'image'}
                               onChange={(e) => setImage({image: e.target.files[0]})}/>
                        <span className={'text-danger'}>{error.image}</span>
                    </div>

                    <button type="submit" className="btn btn-primary">Ajouter</button>
                </form>
            </div>
        </>
    );
}

export default AjouterJeu;