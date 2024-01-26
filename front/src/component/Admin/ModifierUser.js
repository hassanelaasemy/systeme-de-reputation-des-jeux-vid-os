import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import axios from "axios";

function ModifierUser(props) {
    const {id} = useParams();
    const [inputs, setInputs] = useState({
        'user_name': '',
        'email': '',
        'password': '',
        'role': '',
    });
    const [error, setError] = useState({});
    const [image, setImage] = useState([]);
    const [user, setUser] = useState({});

    const fetchUsers = () => {
        axios.get(`http://127.0.0.1:8000/api/users/${id}`)
            .then((res) => {
                // console.log(res.data)
                setInputs({
                    'user_name':res.data.user_name,
                    'email': res.data.email,
                    'role': res.data.role
                })
            })
    }

    useEffect(() => {
        fetchUsers()
    },[])

    const handelChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs({...inputs, [name]: value})
    }


    const handelSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("image", image.image);
        formData.append("user_name", inputs.user_name);
        formData.append("email", inputs.email);
        formData.append("password", inputs.password);
        formData.append("role", inputs.role);
        console.log(inputs);
        axios.put(`http://127.0.0.1:8000/api/users/${id}`,formData)
            .then((res)=>{
                console.log(res)
            })
            .catch(err=>{
            console.log(err)
        })
    }
    return (
        <div>
            <NavbarAdmin/>
            <div className={'container'}>

                <h3>Ajouter Users page</h3>
                <form className={'row g-3'} onSubmit={handelSubmit}>
                    <div className="col-md-6">
                        <label className="form-label">Nom</label>
                        <input type="text" value={inputs.user_name &&inputs.user_name} onChange={handelChange} name={'user_name'} className="form-control"/>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input type="email" value={inputs.email &&inputs.email} onChange={handelChange} name={'email'} className="form-control"/>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Password</label>
                        <input type="password" onChange={handelChange} name={'password'} className="form-control"/>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Role</label>
                        <select name="role" value={inputs.role &&inputs.role} onChange={handelChange} className={'form-control'} >
                            <option value="" disabled>Choisir un rôle</option>
                            <option value="admin">Admin</option>
                            <option value="pedagogue">Pedagogue</option>
                            <option value="utilisateur">Utilisateur</option>
                            <option value="validateur">Validateur</option>
                        </select>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Image</label>
                        <input type="file" className="form-control" name={'image'} onChange={(e) => setImage({image: e.target.files[0]})}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Modifier</button>
                </form>
            </div>

        </div>
    );
}

export default ModifierUser;