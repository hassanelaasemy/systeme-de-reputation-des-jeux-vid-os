import React, {useEffect, useState} from 'react';
import NavbarUtilisateur from "./NavbarUtilisateur";
import axios from "axios";
import {Link} from "react-router-dom";

function Profile(props) {
    const [user, setUser] = useState({});
    const id = localStorage.getItem('id');
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/users/${id}`)
            .then((res) => {
                setUser(res.data)
            });
    }, [])
    return (
        <>
            <NavbarUtilisateur/>
            <div className={'container-fluid'}>

                <div className="pagetitle">
                    <h1>Profile</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={'/utilisateur/home'}>Home</Link></li>
                            <li className="breadcrumb-item active">Profile</li>
                        </ol>
                    </nav>
                </div>
                <section className="container section profile ">

                    <div className="row ">

                        <div className="card">
                            <div className="card-body pt-3">
                                <ul className="nav nav-tabs nav-tabs-bordered">

                                    <li className="nav-item">
                                        <button className="nav-link active" data-bs-toggle="tab"
                                                data-bs-target="#profile-overview">Overview
                                        </button>
                                    </li>


                                </ul>

                                <div className="tab-content pt-2">

                                    <div className="tab-pane fade show active profile-overview"
                                         id="profile-overview">
                                        <h5 className="card-title">About</h5>
                                        <p className="small fst-italic">Sunt est soluta temporibus accusantium neque
                                            nam
                                            maiores cumque temporibus. Tempora libero non est unde veniam est qui
                                            dolor.
                                            Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga
                                            sequi
                                            sed ea saepe at unde.</p>
                                        <img src={`http://127.0.0.1:8000/${user.image}`} width={'100px'}
                                             alt="Profile"
                                             className="rounded-circle"/>
                                        <h5 className="card-title">Profile Details</h5>

                                        <div className="row">
                                            <div className="col-lg-3 col-md-4 label ">Nom</div>
                                            <div className="col-lg-9 col-md-8">{user.user_name}</div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-3 col-md-4 label">Role</div>
                                            <div className="col-lg-9 col-md-8">{user.role}</div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-3 col-md-4 label">Pay</div>
                                            <div className="col-lg-9 col-md-8">Maroc</div>
                                        </div>


                                        <div className="row">
                                            <div className="col-lg-3 col-md-4 label">Phone</div>
                                            <div className="col-lg-9 col-md-8">(436) 486-3538 x29071</div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-3 col-md-4 label">Email</div>
                                            <div className="col-lg-9 col-md-8">{user.email}</div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Profile;
